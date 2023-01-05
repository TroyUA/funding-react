import React from 'react'

interface IUpload {
  text: string
  name?: string
}
const Upload: React.FC<IUpload> = ({ text, name = 'upload' }) => {
  const uniqueId = `${name}_${Math.random()}`
  return (
    <div className="upload-box">
      <label className="upload-box__label" htmlFor={uniqueId}>
        {text}
      </label>
      <input className="upload-box__input" type="file" name={name} id={uniqueId} accept="image/*" />
    </div>
  )
}

export default Upload
