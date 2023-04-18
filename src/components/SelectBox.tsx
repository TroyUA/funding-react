import React, { MouseEvent, useEffect, useMemo, useState } from 'react'

interface ISelectBox {
  name: string
  options: IOption[] | undefined
  onChange: (value: string | number | undefined) => void
}

export interface IOption {
  value?: string | number
  label: string
  selected?: boolean
  disabled?: boolean
  hidden?: boolean
}

const SelectBox: React.FC<ISelectBox> = (props) => {
  const { name, options: propsOptions = [], onChange } = props
  const defaultState = {
    label: name,
    selected: true,
    hidden: true,
  } as IOption

  const options = useMemo(() => [defaultState, ...propsOptions], [propsOptions])
  const [selectedValue, setSelectedValue] = useState(options[0].value)
  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue) || options[0],
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
      setSelectedValue(option.value)
    }

    setShowList(false)
  }

  useEffect(() => {
    onChange(selectedValue)
  }, [selectedValue])

  return (
    <div
      className="select-box"
      tabIndex={0}
      onClick={() => toggleShow()}
      onBlur={() => setShowList(false)}
    >
      {/* input for form submiting */}
      <input type="hidden" value={selectedOption?.value} name={name} />
      <div className={`select-box__value ${selectedOption.hidden ? 'hidden' : ''}`}>
        {selectedOption.label}
      </div>
      {options && (
        <ul className={`select-box__options ${showList ? 'show' : ''}`}>
          {options.map((option) => (
            <li
              className={`select-box__option ${option.selected ? 'selected' : ''} ${
                option.hidden ? 'hidden' : ''
              }`}
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
