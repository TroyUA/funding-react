import React, { DetailedHTMLProps, InputHTMLAttributes, useId } from 'react'

interface IUploadProps {
  text: string
  name: string
}
const Upload: React.FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & IUploadProps
> = ({ text, name = 'upload', ...rest }) => {
  const uploadId = useId()
  return (
    <div className="upload-box" tabIndex={0}>
      <label className="upload-box__label" htmlFor={uploadId}>
        {text}
      </label>
      <input
        className="upload-box__input"
        name={name}
        type="file"
        id={uploadId}
        accept="image/png, image/jpeg, image/jpg"
        {...rest}
      />
    </div>
  )
}

export default Upload
