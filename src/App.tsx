import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import Markets from './components/Markets'
import Process from './components/Process'
import Team from './components/Team'
import Testimonials from './components/Testimonials'
import References from './components/References'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <References />
        <Products />
        <Markets />
        <Process />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  )
}
