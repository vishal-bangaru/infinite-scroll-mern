import React from 'react'
import {Outlet} from 'react-router-dom'
import Register from './components/Register'

function RootLayout() {
 

  return (
    <div>
    
    <Outlet/>
    </div>
  )
}

export default RootLayout