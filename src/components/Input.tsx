import { useId, FC, ComponentProps } from 'react'
import { classNames } from '../utils'
import { ErrorMessage, useField } from 'formik'

type InputProps = ComponentProps<'input'> & {
  label?: string
  name: string
}

const Input: FC<InputProps> = (props) => {
  const id = useId()
  const { label, ...rest } = props
  const [, meta] = useField(rest)
  return (
    <div className={classNames('input-box', Boolean(meta.error && meta.touched) && 'error')}>
      {label && (
        <label className="input-box__label" htmlFor={id}>
          {label}
        </label>
      )}
      <input {...rest} className="input-box__input" id={id} />
      <ErrorMessage name={rest.name} className="error-msg" component="span" />
    </div>
  )
}

export default Input
