import React, {
  KeyboardEventHandler,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { classNames } from '../utils/functions'
import type { Nullable } from '../utils/types'
import { ErrorMessage, useField } from 'formik'
// import useDebounce from '../hooks/useDebounce'

export type Value = Nullable<string | number>
interface SelectBoxProps {
  placeholder: string
  name: string
  options: Option[] | undefined
  onChange: (value?: Value) => void
  className?: string
  defaultValue?: Value
}

export interface Option {
  value: Value
  label: string
}

const SelectBox: React.FC<SelectBoxProps> = (props) => {
  const { name, options, onChange, className, placeholder, defaultValue } = props
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const selectedValue = selectedOption?.value
  const selectedIndex = useMemo(
    () => selectedOption && options?.indexOf(selectedOption),
    [selectedOption, options]
  )
  const [showList, setShowList] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)
  const debounceTimeoutRef = useRef<number>()
  const searchTermRef = useRef('')
  const [, , helpers] = useField(name)
  const toggleShow = () => {
    setShowList((prev) => !prev)
  }
  const optionClickHandler = (e: MouseEvent, option: Option) => {
    e.stopPropagation()
    if (option !== selectedOption) setSelectedOption(option)
    setShowList(false)
  }
  const doSearch = (key: string) => {
    clearTimeout(debounceTimeoutRef.current)
    searchTermRef.current += key
    debounceTimeoutRef.current = setTimeout(() => {
      searchTermRef.current = ''
    }, 500)

    const searchedOption = options?.find((option) =>
      option.label.toLowerCase().startsWith(searchTermRef.current)
    )
    if (searchedOption && searchedOption !== selectedOption) {
      setSelectedOption(searchedOption)
    }
  }
  const keydownHandler: KeyboardEventHandler = (e) => {
    if (e.target != selectRef.current || e.code === 'Tab') return
    console.log(e.code)

    switch (e.code) {
      case 'Enter':
      case 'Space':
        e.preventDefault()
        toggleShow()
        break
      case 'Escape':
        setShowList(false)
        break
      case 'Backspace':
      case 'Delete':
        setSelectedOption(null)
        break
      case 'ArrowUp':
        {
          e.preventDefault()
          const prevOption = options && selectedIndex ? options[selectedIndex - 1] : null
          if (prevOption) setSelectedOption(prevOption)
        }
        break
      case 'ArrowDown':
        {
          e.preventDefault()
          const nextOption = options
            ? selectedIndex != null
              ? options[selectedIndex + 1]
              : options[0]
            : null
          if (nextOption) setSelectedOption(nextOption)
        }
        break
      default:
        doSearch(e.key)
    }
  }

  useEffect(() => {
    if (defaultValue !== selectedValue) {
      setSelectedOption(options?.find((option) => defaultValue === option.value) || null)
    }
  }, [defaultValue, options])

  useEffect(() => {
    onChange(selectedValue)
    helpers?.setValue(selectedValue)
  }, [selectedValue])

  return (
    <div
      ref={selectRef}
      onKeyDown={keydownHandler}
      className={classNames('select-box', !!className && className)}
      tabIndex={0}
      onClick={() => toggleShow()}
      onBlur={() => setShowList(false)}
    >
      <input type="hidden" value={selectedValue ?? ''} name={name} />
      <div className={classNames('select-box__value', !selectedOption && 'hidden')}>
        {selectedOption?.label || placeholder}
      </div>
      {
        <ul className={classNames('select-box__options', showList && 'show')}>
          {options &&
            options.map((option) => (
              <li
                className={classNames(
                  'select-box__option',
                  option === selectedOption && 'selected'
                )}
                key={option.value}
                onClick={(e) => optionClickHandler(e, option)}
              >
                {option.label}
              </li>
            ))}
        </ul>
      }
      <ErrorMessage name={name} className="error-msg" component="span" />
    </div>
  )
}

export default SelectBox
