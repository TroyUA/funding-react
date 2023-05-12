import React, { useId } from 'react'

interface IUpload {
  text: string
  name?: string
}
const Upload: React.FC<IUpload> = ({ text, name = 'upload' }) => {
  const uploadInputId = useId()
  return (
    <div className="upload-box" tabIndex={0}>
      <label className="upload-box__label" htmlFor={uploadInputId}>
        {text}
      </label>
      <input
        className="upload-box__input"
        type="file"
        name={name}
        id={uploadInputId}
        accept="image/*"
      />
    </div>
  )
}

export default Upload
