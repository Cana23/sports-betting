import AppRoutes from './routes'
import Header from './components/Header'
import Footer from './components/Footer'
import Preload from './components/Preload'

function App() {
  return (
    <>
      <Preload />
      <div className="flex flex-col gap-18">
        <Header />
        <AppRoutes />
        <Footer />
      </div>
    </>
  )
}

export default App
