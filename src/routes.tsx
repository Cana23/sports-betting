import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Teams from './pages/Teams'
import Predictions from './pages/Predictions'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/equipo/barca" element={<Predictions />} />
    </Routes>
  )
}
