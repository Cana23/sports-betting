import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preload() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 bg-neutral-950 flex items-center justify-center z-[9999] overflow-hidden"
        >
          <motion.img
            src="/src/assets/images/preload/left-player.png"
            alt="Jugador izquierdo"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.2, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="hidden lg:block absolute left-0 bottom-0 max-h-[70%]"
          />
          <motion.img
            src="/src/assets/images/preload/right-player.png"
            alt="Jugador derecho"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 0.2, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
            className="hidden lg:block absolute right-0 bottom-0 max-h-[70%]"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center px-4"
          >
            <div className="text-3xl md:text-5xl font-extrabold tracking-wider bg-gradient-to-r from-green-400 to-cyan-500 text-transparent bg-clip-text font-[Inter]">
              IT'S TIME
            </div>
            <div className="text-6xl md:text-8xl font-black text-white mt-2">
              FUTBOL
            </div>
            <div className="text-green-400 font-semibold text-lg mt-1">
              BETS ON
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
