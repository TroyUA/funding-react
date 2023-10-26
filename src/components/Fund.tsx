import React from 'react'
import type { IFund } from '../store/lists/types'

const Fund: React.FC<IFund> = (props) => {
  return (
    <article className="fund article">
      <div
        className="fund__fon"
        style={{ backgroundImage: `url('${props.img}'), url('/src/img/charity-fund-fon.png')` }}
      >
        <div className="fund__category-btn btn_black">
          <span className="btn__text">{props.category}</span>
        </div>
      </div>
      <a className="fund__donation-btn btn_with-image" href={props.link}>
        <div className="btn__icon">
          <img alt="arrow" src="/src/img/arrow.svg" />
        </div>
        <span className="btn__text">{props.name}</span>
      </a>
    </article>
  )
}

export default Fund
