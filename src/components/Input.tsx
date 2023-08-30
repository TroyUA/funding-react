import React, { DetailedHTMLProps, InputHTMLAttributes, useId } from 'react'
import { classNames } from '../utils'
import { ErrorMessage, useField } from 'formik'

const Input: React.FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?: string
    name: string
  }
> = (props) => {
  const id = useId()
  const { label, ...rest } = props
  const [field, meta, helpers] = useField(rest)
  return (
    <div className={classNames('input-box', Boolean(meta.error && meta.touched) && 'error')}>
      {label && (
        <label className="input-box__label" htmlFor={id}>
          {label}
        </label>
      )}
      <input className="input-box__input" {...rest} id={id} />
      <ErrorMessage name={rest.name} className="error-msg" component="span" />
      {/* {errorMsg && <span className="error-msg">{errorMsg}</span>} */}
    </div>
  )
}

export default Input
