import React from 'react'
import Navbar from '../../components/navbar/Navbar'

export default function MainLayout({ hideNavbar, children }) {
  return (
    <div>
      {!hideNavbar && <Navbar />} {/* Navbar sadece istenmeyen durumlarda gizlenir */}
      <main>{children}</main>
    </div>
  )
}
