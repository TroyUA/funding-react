import React, { KeyboardEvent, useCallback, useEffect, useRef } from 'react'
import { classNames } from '../utils'
import Button from './Button'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setIsSidebarOpen } from '../store/layout/slice'
import useScrollLock from '../hooks/useScrollLock'
import { ROUTES } from '../routes'

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isOpen } = useAppSelector((state) => state.layout.sidebar)
  const sidebarRef = useRef<HTMLDivElement>(null)
  useScrollLock(isOpen)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(setIsSidebarOpen(false))
      }
    },
    [setIsSidebarOpen]
  )

  useEffect(() => {
    if (isOpen) {
      sidebarRef.current?.focus()
      // @ts-ignore
      sidebarRef.current?.addEventListener('keydown', handleKeyDown)
    } else {
      // @ts-ignore
      sidebarRef.current?.removeEventListener('keydown', handleKeyDown)
    }
    return () => {
      // @ts-ignore
      sidebarRef.current?.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  return (
    <div
      tabIndex={0}
      className={classNames('header__burger-sidebar', isOpen && 'open')}
      onClick={(e) => {
        if (e.currentTarget === e.target) return
        dispatch(setIsSidebarOpen(false))
      }}
      // onBlur={() => dispatch(setIsSidebarOpen(false))}
      ref={sidebarRef}
    >
      <div className="header__burger-nav-links">
        <Button
          to={ROUTES.FUNDS}
          className="btn_with-image_white"
          imgSrc="/src/img/arrow.svg"
          alt="arrow"
        >
          Charity Funds
        </Button>
        <Button
          to={ROUTES.LEADERBOARD}
          className="btn_with-image_white"
          imgSrc="/src/img/arrow.svg"
          alt="arrow"
        >
          Donations Leaderboards
        </Button>
      </div>
      <a href="#" className="header__burger-contact-us">
        supportua@gmail.com
      </a>
    </div>
  )
}

export default Sidebar
