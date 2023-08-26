import React, { DetailedHTMLProps, InputHTMLAttributes, useId } from 'react'
import { classNames } from '../utils'

const Input: React.FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    errorMsg?: string
    label?: string
  }
> = (props) => {
  const id = useId()
  const { errorMsg, label, ...rest } = props
  return (
    <div className={classNames('input-box', !!errorMsg && 'error')}>
      {label && (
        <label className="input-box__label" htmlFor={id}>
          {label}
        </label>
      )}
      <input className="input-box__input" {...rest} id={id} />
      {errorMsg && <span className="input-box__error">{errorMsg}</span>}
    </div>
  )
}

export default Input
