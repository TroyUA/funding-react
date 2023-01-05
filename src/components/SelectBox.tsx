import React, { useRef } from 'react'

interface ISelectBox {
  name: string
  data: IOption[]
}

interface IOption {
  value: string | number
  text: string
  selected?: boolean
  disabled?: boolean
  hidden?: boolean
}

const SelectBox: React.FC<ISelectBox> = ({ name, data }) => {
  const selectRef = useRef(null)

  return (
    <>
      <select style={{ display: 'none' }} ref={selectRef}>
        <option>{name}</option>
      </select>
      <div className="select-box" tabIndex={0}>
        <div className="select-box__value">{name}</div>
        {data && (
          <ul className="select-box__options">
            {data.map((item) => (
              <li key={item.value}>{item.text}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default SelectBox
