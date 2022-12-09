import React from 'react'

interface MainProps extends React.PropsWithChildren {
  // children: React.PropsWithChildren
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main className="main">
      <div className="main__wrapper">{children}</div>
    </main>
  )
}

export default Main
