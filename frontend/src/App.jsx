import React from 'react'
import Home from './pages/Home.jsx'
import Library from './pages/Library.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Profile from './pages/Profile.jsx'
import Upload from './pages/Upload.jsx'
import Auth from './pages/Auth.jsx'
import Player from './pages/Player.jsx'

function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<Home />
    },
    {
      path:'/library',
      element:<Library />
    },
    {
      path:'/profile',
      element:<Profile />
    },
    {
      path:'/upload',
      element:<Upload />
    },
    {
      path:'/auth',
      element:<Auth />
    },
    {
      path:'/player',
      element:<Player />
    }
  ])
  return (
      <>
        <RouterProvider router={router}/>
      </>
  )
}

export default App
