import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import MarkisenPage from './pages/MarkisenPage'
import UnternehmenPage from './pages/UnternehmenPage'
import KontaktPage from './pages/KontaktPage'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/markisen" element={<MarkisenPage />} />
          <Route path="/unternehmen" element={<UnternehmenPage />} />
          <Route path="/kontakt" element={<KontaktPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
