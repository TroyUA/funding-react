import React, { MouseEvent, useEffect, useState } from 'react'
import { classNames } from '../utils'
import { ErrorMessage, useField } from 'formik'

export type Value = string | number
interface SelectBoxProps {
  placeholder: string
  name: string
  options: Option[] | undefined | null
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
  const [selected, setSelected] = useState<Option | null>(null)
  const value = selected?.value
  const [showList, setShowList] = useState(false)
  const toggleShow = () => {
    setShowList((prev) => !prev)
  }
  const optionClickHandler = (event: MouseEvent, option: Option) => {
    event.stopPropagation()
    if (option !== selected) setSelected(option)
    setShowList(false)
  }

  const [, , helpers] = useField(name)

  useEffect(() => {
    if (options) setSelected(options.find((option) => defaultValue === option.value) || null)
  }, [defaultValue, options])

  useEffect(() => {
    onChange(value)
    helpers?.setValue(value)
  }, [value])

  return (
    <div
      className={classNames('select-box', !!className && className)}
      tabIndex={0}
      onClick={() => toggleShow()}
      onBlur={() => setShowList(false)}
    >
      <input type="hidden" value={value || ''} name={name} />
      <div className={classNames('select-box__value', !selected && 'hidden')}>
        {selected?.label || placeholder}
      </div>
      {options && (
        <ul className={classNames('select-box__options', showList && 'show')}>
          {options.map((option) => (
            <li
              className={classNames('select-box__option', option === selected && 'selected')}
              key={option.value}
              onClick={(e) => optionClickHandler(e, option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      <ErrorMessage name={name} className="error-msg" component="span" />
    </div>
  )
}

export default SelectBox
