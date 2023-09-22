import { RouterProvider } from 'react-router-dom'
import { useGetProfileQuery } from './store/auth/service'
import { router } from './router/browserRouter'

const App = () => {
  useGetProfileQuery()

  return <RouterProvider router={router} />
}

export default App
