import React from 'react'
import { Outlet } from 'react-router'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'

// interface LayoutProps extends React.PropsWithChildren {}

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  )
}

export default Layout
