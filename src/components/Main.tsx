import React from 'react'

interface MainProps extends React.PropsWithChildren {
  // children: React.PropsWithChildren
}

const Main: React.FC<MainProps> = ({ children }) => {
  return <main className="main">{children}</main>
}

export default Main
