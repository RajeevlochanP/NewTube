import React from 'react'
import Home from './pages/Home.jsx'
import Library from './pages/Library.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Profile from './pages/Profile.jsx'
import Upload from './pages/Upload.jsx'
import Auth from './pages/Auth.jsx'
import Player from './pages/Player.jsx'
import RootLayout from './components/RootLayout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ErrorComponent from './components/ErrorComponent.jsx'
import { Toaster } from 'react-hot-toast'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement:<ErrorComponent />,
      children: [
        {
          index:true,
          element:<Home />
        },
        {
          path: '/library',
          element: <Library />
        },
        {
          path: '/profile',
          element: <ProtectedRoute/>,
          children:[
            {
              index:true,
              element:<Profile />
            }
          ]
        },
        {
          path: '/upload',
          element: <ProtectedRoute />,
          children:[
            {
              index:true,
              element:<Upload />
            }
          ]
        },
        {
          path: '/auth',
          element: <Auth />
        },
        {
          path: '/player/:id',
          element: <Player />
        },
      ]
    },

  ])
  return (
    <>
    <Toaster position='top-center'/>
      <RouterProvider router={router} />
    </>
  )
}

export default App
