import { ErrorMessage } from 'formik'
import { ComponentProps, FC, RefAttributes, forwardRef, useId } from 'react'

type UploadProps = ComponentProps<'input'> &
  RefAttributes<HTMLInputElement> & {
    text: string
    name: string
  }
const Upload: FC<UploadProps> =
// eslint-disable-next-line react/display-name
  forwardRef(({ text, name, ...rest }, ref) => {
    const uploadId = useId()
    // const [field, , helpers] = useField(name)
    return (
      <div className="upload-box" tabIndex={0}>
        <label className="upload-box__label" htmlFor={uploadId}>
          {text}
        </label>
        <input
          className="upload-box__input"
          name={name}
          ref={ref}
          type="file"
          id={uploadId}
          // onChange={(e) => {
          //   if (e.currentTarget.files) helpers.setValue(e.currentTarget.files[0])
          // }}
          {...rest}
        />
        <ErrorMessage name={name} className="error-msg" component="span" />
      </div>
    )
  })

export default Upload
