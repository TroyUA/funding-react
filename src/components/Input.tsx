import React, { DetailedHTMLProps, InputHTMLAttributes, useId } from 'react'
import { classNames } from '../utils'
import { Field } from 'formik'

const Input: React.FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    errorMsg?: string
    label?: string
  }
> = (props) => {
  const id = useId()
  const { ref, errorMsg, label, ...rest } = props
  return (
    <div className={classNames('input-box', !!errorMsg && 'error')}>
      {label && (
        <label className="input-box__label" htmlFor={id}>
          {label}
        </label>
      )}
      <input {...rest} id={id} />
      {errorMsg && (
        <span className="input-box__error" ref={ref}>
          {errorMsg}
        </span>
      )}
    </div>
  )
}

export default Input
