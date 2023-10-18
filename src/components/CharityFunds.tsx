import React from 'react'
import Button from './Button'
import { listsAPI } from '../store/lists/service'
import Fund from './Fund'
import { ROUTES } from '../router'
import { useLocation } from 'react-router-dom'

interface CharityFundsProps {
  limit?: number
}
const CharityFunds: React.FC<CharityFundsProps> = ({ limit = 3 }) => {
  const { data: funds, isLoading } = listsAPI.useGetFundsQuery({ limit })
  const isOnCharityFundsPage = useLocation().pathname.includes(ROUTES.FUNDS)

  return (
    <section className="charity-funds">
      <h1>charity funds</h1>
      <div className="charity-funds__list">
        {funds?.map((fund) => (
          <Fund key={fund.id} {...fund} />
        ))}
      </div>
      {!isOnCharityFundsPage && (
        <Button
          className="see-all-btn btn_with-image"
          imgSrc="/src/img/arrow.svg"
          alt="arrow"
          to={ROUTES.FUNDS}
        >
          See All
        </Button>
      )}
    </section>
  )
}

export default CharityFunds
