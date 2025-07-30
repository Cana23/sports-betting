import { useState } from 'react'
// import ContactModal from './ContactModal'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Quienes somos', href: '/#features' },
    { name: 'Preguntas', href: '/#faqs' },
  ]

  return (
    <>
      <header className="pt-4 px-4 md:px-10">
        <div className="bg-white/10 backdrop-blur rounded-full border border-white/10 shadow-md flex justify-between items-center py-3 px-5 md:px-8 max-w-6xl mx-auto">
          <a href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <img src="/src/assets/logo.png" alt="" className="w-[14%] md:w-[20%] lg:w-[8%] object-cover" />
            <p className="text-white font-semibold">Sports Betting</p>
            </div>
          </a>

          {/* Desktop menu */}
          <nav className="hidden md:flex gap-6 items-center text-sm font-medium text-white">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="hover:text-lime-400 transition text-nowrap"
              >
                {item.name}
              </a>
            ))}

            {/* <Link to="/teams"> */}
            <a href="/teams">
              <button
                className="bg-gradient-to-r from-lime-400 to-green-500 text-black font-semibold rounded-full px-5 py-2 hover:opacity-90 transition cursor-pointer"
              >
                Apostar
              </button>
            </a>
              {/* </Link> */}
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-2 bg-white/10 backdrop-blur rounded-xl border border-white/10 shadow-md px-6 py-4 max-w-6xl mx-auto text-white flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="hover:text-lime-400 transition"
              >
                {item.name}
              </a>
            ))}

            {/* <Link to="/teams"> */}
            <a href="/teams">
              <button
                className="bg-gradient-to-r from-lime-400 to-green-500 text-black font-semibold rounded-full px-5 py-2 hover:opacity-90 transition cursor-pointer"
              >
                Apostar
              </button>
            </a>
            {/* </Link> */}
          </div>
        )}
      </header>

    </>
  )
}
