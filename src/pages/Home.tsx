import React from 'react'
import Button from '../components/Button'

const Home = () => {
  return (
    <>
      <section className="leaderboard section">
        <div className="section__wrapper">
          <h2>donation leaderboard</h2>
          <ul className="users">
            <li className="user">
              <img className="user__icon" alt="user icon" src="src\img\user-icon1.png" />
              <div className="user__all-other-info">
                <div className="user__text-info">
                  <p className="user__about">Lorem ipsum dolor sit amet.</p>
                  <p className="user__address">New York, US</p>
                </div>
                <div className="user__numbers">
                  <p className="user__amount">$10,000.00</p>
                  <p className="user__rank">#1</p>
                  <Button
                    className={'user__arrow-btn btn'}
                    imgSrc={'/src/img/arrow.svg'}
                    to={'#'}
                    alt={'arrow'}
                  ></Button>
                </div>
              </div>
            </li>
            <li className="user">
              <img className="user__icon" alt="user icon" src="src\img\user-icon1.png" />
              <div className="user__all-other-info">
                <div className="user__text-info">
                  <p className="user__about">Lorem ipsum dolor sit amet.</p>
                  <p className="user__address">Kyiv, UKR</p>
                </div>
                <div className="user__numbers">
                  <p className="user__amount">$9,450.00</p>
                  <p className="user__rank">#2</p>
                  <Button
                    className={'user__arrow-btn btn'}
                    imgSrc={'/src/img/arrow.svg'}
                    to={'#'}
                    alt={'arrow'}
                  ></Button>
                </div>
              </div>
            </li>
            <li className="user">
              <img className="user__icon" alt="user icon" src="src\img\user-icon1.png" />
              <div className="user__all-other-info">
                <div className="user__text-info">
                  <p className="user__about">Lorem ipsum dolor sit amet.</p>
                  <p className="user__address">Paris, FR</p>
                </div>
                <div className="user__numbers">
                  <p className="user__amount">$6,460.00</p>
                  <p className="user__rank">#3</p>
                  <Button
                    className={'user__arrow-btn btn'}
                    imgSrc={'/src/img/arrow.svg'}
                    to={'#'}
                    alt={'arrow'}
                  ></Button>
                </div>
              </div>
            </li>
          </ul>
          <Button
            className="see-all-btn btn_with-image"
            imgSrc="/src/img/arrow.svg"
            alt="arrow"
            to="/leaderboard"
          >
            See All
          </Button>
        </div>
      </section>
      <section className="how-it-works section">
        <div className="section__wrapper">
          <h2>how it works</h2>
          <div className="how-it-works__steps">
            <article className="how-it-works__step article">
              <img
                className="how-it-works__step-img"
                src="src\img\create-account.png"
                alt="create account"
              />
              <h3 className="how-it-works__step-description">Create an account</h3>
            </article>
            <article className="how-it-works__step article">
              <img
                className="how-it-works__step-img"
                src="src\img\submit-donation.png"
                alt="submit donation"
              />
              <h3 className="how-it-works__step-description">Submit donation request</h3>
            </article>
            <article className="how-it-works__step article">
              <img className="how-it-works__step-img" src="src\img\compete.png" alt="compete" />
              <h3 className="how-it-works__step-description">Compete with others</h3>
            </article>
          </div>
          <Button to="/donation" className="how-it-works__register-donation-btn btn_black">
            <span className="btn__text">register donation</span>
          </Button>
        </div>
      </section>
      <section className="charity-funds section">
        <div className="section__wrapper">
          <h2>charity funds</h2>
          <ul className="charity-funds__list">
            <li>
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
            </li>
            <li>
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
            </li>
            <li>
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
            </li>
          </ul>
          <Button
            className="see-all-btn btn_with-image"
            imgSrc="/src/img/arrow.svg"
            alt="arrow"
            to="/funds"
          >
            See All
          </Button>
        </div>
      </section>
    </>
  )
}

export default Home
