import { Field, useField } from 'formik'
import React, { DetailedHTMLProps, InputHTMLAttributes, RefAttributes, useId } from 'react'

interface IUploadProps {
  text: string
  name: string
}
const Upload: React.FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    IUploadProps &
    RefAttributes<HTMLInputElement>
> = React.forwardRef(({ text, name = 'upload', ...rest }, ref) => {
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
        // accept="image/png, image/jpeg, image/jpg"
        {...rest}
      />
    </div>
  )
})

export default Upload
