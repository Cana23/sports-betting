import AppRoutes from './routes'
import Header from './components/Header'
import Footer from './components/Footer'
import Preload from './components/Preload'
import { PeriodProvider } from './context/PeriodProvider'

function App() {
  return (
    <>
      <Preload />
      <div className="flex flex-col gap-18">
        <Header />
        <PeriodProvider>
        <AppRoutes />
        </PeriodProvider>
        <Footer />
      </div>
    </>
  )
}

export default App
