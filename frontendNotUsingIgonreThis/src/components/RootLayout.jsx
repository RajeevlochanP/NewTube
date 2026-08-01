import React from 'react'
import Header from './Header'
import CheckAuthComp from './CheckAuthComp'
import { Outlet } from 'react-router-dom'
function RootLayout() {
  return (
    <>
      <Header />
      <CheckAuthComp />
    </>
  )
}

export default RootLayout
