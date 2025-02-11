import { createBrowserRouter } from 'react-router-dom'
import ErrorBoundary from '@/components/ErrorBoundry'
//Pages
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage'
import StatusPage from './pages/StatusPage/StatusPage'

const router = createBrowserRouter([
  {
    element: <StatusPage />,
    path: '/',
    errorElement: <ErrorBoundary />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
])

export default router
