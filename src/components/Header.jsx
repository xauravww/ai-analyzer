import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <motion.div
            className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center mr-3"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-white font-bold text-xl">R</span>
          </motion.div>
          <h1 className={`font-bold transition-all duration-300 ${
            scrolled ? 'text-secondary-800 text-xl' : 'text-secondary-800 text-2xl'
          }`}>
            ResumeAI
          </h1>
        </div>
        
      </div>
    </motion.header>
  )
}

export default Header