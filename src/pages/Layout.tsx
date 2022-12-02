import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Main from '../components/Main'

interface LayoutProps extends React.PropsWithChildren {}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <>
      <Header />
      <Main>
        {/* {children} */}
        <Outlet />
      </Main>
      <Footer />
    </>
  )
}

export default Layout
