import React, { MouseEvent, useEffect, useMemo, useState } from 'react'
import { logout } from '../store/auth/slice'

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
  const { name, options = [], onChange } = props
  const defaultState = {
    label: name,
    value: '',
    selected: true,
    hidden: true,
  } as IOption

  // const fullOptions = useMemo(() => [defaultState, ...options], [options])

  const [fullOptions, setFullOptions] = useState(
    useMemo(() => [defaultState, ...options], [options])
  )
  const [showList, setShowList] = useState(false)
  const [selectedOption, setSelectedOption] = useState(defaultState)

  function getSelectedOption(options: IOption[]) {
    return options.find((option) => option.selected)
  }

  const toggleShow = () => {
    setShowList((prev) => !prev)
  }

  const optionClickHandler = (event: MouseEvent, option: IOption, array: IOption[]) => {
    event.stopPropagation()
    if (option === getSelectedOption(array)) return
    let previousSelected = array.find((item) => item.selected === true)
    previousSelected!.selected = false

    option.selected = true
    setSelectedOption(option)
    onChange(option)
    setShowList(false)
  }

  return (
    <>
      <div
        className="select-box"
        tabIndex={0}
        onClick={() => toggleShow()}
        onBlur={() => setShowList(false)}
      >
        <input type="hidden" value={selectedOption.value} name={name} />
        {/* input for form submiting */}
        <div className="select-box__value">{selectedOption.label}</div>
        {fullOptions && (
          <ul className={`select-box__options ${showList ? 'show' : ''}`}>
            {fullOptions.map((item, _, array) => (
              <li
                className={`select-box__option ${item.selected ? 'selected' : ''} ${
                  item.hidden ? 'hidden' : ''
                }`}
                key={item.value}
                onClick={(e) => optionClickHandler(e, item, array)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default SelectBox
