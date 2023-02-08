import React, { MouseEvent, useEffect, useMemo, useState } from 'react'

interface ISelectBox {
  name: string
  options: IOption[] | undefined
  onChange: (value: IOption | undefined) => void
  // reset?: boolean
}

export interface IOption {
  value: string | number
  label: string
  selected?: boolean
  disabled?: boolean
  hidden?: boolean
}

// const Option: React.FC<IOption> = (item) => {

//   return (
//     <li
//       className="select-box__option"
//       key={item.value}
//       onClick={(event: MouseEvent) => {
//         event.stopPropagation()
//         setSelectedOption(item)
//         onChange(item)
//         setShowList(false)
//       }}
//     >
//       {item.label}
//     </li>
//   )
// }

const SelectBox: React.FC<ISelectBox> = (props) => {
  const { name, options: propsOptions = [], onChange } = props
  const defaultState = {
    label: name,
    value: '',
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
    if (option === selectedOption) return

    let previousSelected = selectedOption
    if (previousSelected) previousSelected.selected = false

    option.selected = true
    setSelectedValue(option.value)
    onChange(option)
    setShowList(false)
  }

  // useEffect(() => {
  //   console.log(`${name} ${JSON.stringify(options)}`)
  // }, [options])

  return (
    <>
      <div
        className="select-box"
        tabIndex={0}
        onClick={() => toggleShow()}
        onBlur={() => setShowList(false)}
      >
        {/* <input type="hidden" value={selectedOption?.value} name={name} /> */}
        {/* input for form submiting */}
        <div className="select-box__value">{selectedOption.label}</div>
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
    </>
  )
}

export default SelectBox
