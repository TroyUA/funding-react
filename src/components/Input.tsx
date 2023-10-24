import { useId } from 'react'
import { classNames } from '../utils'
import { ErrorMessage, useField } from 'formik'

type InputProps = React.ComponentProps<'input'> & {
  label?: string
  name: string
}

const Input: React.FC<InputProps> = (props) => {
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
      <input className="input-box__input" {...rest} id={id} />
      <ErrorMessage name={rest.name} className="error-msg" component="span" />
    </div>
  )
}

export default Input
