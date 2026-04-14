import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingCTA from './FloatingCTA'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingCTA />
    </>
  )
}
