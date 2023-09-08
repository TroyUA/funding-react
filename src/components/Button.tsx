import React from 'react'
import { Link } from 'react-router-dom'
import type { Route } from '../routes'

export interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  imgSrc?: string
  className?: string
  onClick?: () => void
  to?: Route
  alt?: string
}

const Button: React.FC<IButtonProps> = (props) => {
  const { children, to, imgSrc, className, onClick, alt, ...rest } = props

  const componentInnerStructure = (
    <>
      {children && <div className="btn__text">{children}</div>}
      {imgSrc && (
        <div className="btn__icon">
          <img alt={alt} src={imgSrc} />
        </div>
      )}
    </>
  )
  return to ? (
    <Link to={to} className={className}>
      {componentInnerStructure}
    </Link>
  ) : (
    <button onClick={onClick} className={className} {...rest}>
      {componentInnerStructure}
    </button>
  )
}

export default Button
