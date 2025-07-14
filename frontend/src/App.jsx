import React from 'react'
import Home from './pages/Home.jsx'
import Library from './pages/Library.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Profile from './pages/Profile.jsx'

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
    }
  ])
  return (
      <>
        <RouterProvider router={router}/>
      </>
  )
}

export default App
