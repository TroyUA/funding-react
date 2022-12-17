import React from 'react'
import Button from './Button'

const CharityFunds = () => {
  return (
    <section className="charity-funds section">
      <h1>charity funds</h1>
      <div className="charity-funds__list">
        <article className="charity-funds__item article">
          <div className="charity-funds__item-fon">
            <div className="charity-funds__item-defence-btn btn_black">
              <span className="btn__text">defence and demining</span>
            </div>
          </div>
          <Button
            to="/donation"
            className="charity-funds__item-make-donation-btn btn_with-image"
            imgSrc="/src/img/arrow.svg"
            alt="arrow"
          >
            Make a Donation
          </Button>
        </article>
        <article className="charity-funds__item article">
          <div className="charity-funds__item-fon">
            <div className="charity-funds__item-defence-btn btn_black">
              <span className="btn__text">defence and demining</span>
            </div>
          </div>
          <Button
            to="/donation"
            className="charity-funds__item-make-donation-btn btn_with-image"
            imgSrc="/src/img/arrow.svg"
            alt="arrow"
          >
            Make a Donation
          </Button>
        </article>
        <article className="charity-funds__item article">
          <div className="charity-funds__item-fon">
            <div className="charity-funds__item-defence-btn btn_black">
              <span className="btn__text">defence and demining</span>
            </div>
          </div>
          <Button
            to="/donation"
            className="charity-funds__item-make-donation-btn btn_with-image"
            imgSrc="/src/img/arrow.svg"
            alt="arrow"
          >
            Make a Donation
          </Button>
        </article>
      </div>
      <Button
        className="see-all-btn btn_with-image"
        imgSrc="/src/img/arrow.svg"
        alt="arrow"
        to="/funds"
      >
        See All
      </Button>
    </section>
  )
}

export default CharityFunds
