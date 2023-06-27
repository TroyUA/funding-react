import React, { MouseEvent, useEffect, useMemo, useState } from 'react'
import { classNames } from '../utils'

export type OptionValue = string | number
interface ISelectBoxProps {
  placeholder: string
  name: string
  options: IOption[] | undefined
  onChange: (value?: OptionValue) => void
  className?: string
  selectedValue?: OptionValue
}

export interface IOption {
  value?: OptionValue
  label: string
  selected?: boolean
  disabled?: boolean
  hidden?: boolean
}

const SelectBox: React.FC<ISelectBoxProps> = (props) => {
  const { name, options: propsOptions = [], onChange, className, placeholder } = props
  const defaultState = {
    value: '',
    label: placeholder,
    selected: true,
    hidden: true,
  } as IOption
  const options = useMemo(() => [defaultState, ...propsOptions], [propsOptions])
  const [selectedValue, setSelectedValue] = useState<OptionValue>(
    props.selectedValue ?? options[0].value!
  )
  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue) ?? options[0],
    [options, selectedValue]
  )
  const [showList, setShowList] = useState(false)
  const toggleShow = () => {
    setShowList((prev) => !prev)
  }
  const optionClickHandler = (event: MouseEvent, option: IOption) => {
    event.stopPropagation()
    if (option !== selectedOption) {
      selectedOption.selected = false
      option.selected = true
      setSelectedValue(option.value!)
    }
    setShowList(false)
  }

  useEffect(() => {
    if (props.selectedValue) setSelectedValue(props.selectedValue)
  }, [props.selectedValue])

  useEffect(() => {
    onChange(selectedValue)
  }, [selectedValue])

  return (
    <div
      className={classNames('select-box', !!className && className)}
      tabIndex={0}
      onClick={() => toggleShow()}
      onBlur={() => setShowList(false)}
    >
      {/* input for form submiting */}
      <input
        type="hidden"
        value={selectedOption?.value}
        name={name}
        // onChange={(e) => setSelectedValue(e.target.value)}
      />
      <div className={classNames('select-box__value', !!selectedOption.hidden && 'hidden')}>
        {selectedOption.label}
      </div>
      {options && (
        <ul className={classNames('select-box__options', showList && 'show')}>
          {options.map((option) => (
            <li
              className={classNames(
                'select-box__option',
                !!option.selected && 'selected',
                !!option.hidden && 'hidden'
              )}
              key={option.value}
              onClick={(e) => optionClickHandler(e, option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SelectBox
