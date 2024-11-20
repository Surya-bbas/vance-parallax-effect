import React from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();
  const isAppPage = location.pathname === '/app';

  return (
    <nav className="sticky z-60 top-0 px-10 py-5 border-b-[1px] border-gray-500 bg-vanceGray">
      <div className="flex justify-between items-center max-w-[1440px] mx-auto">
        <img src="vanceLogo.svg" alt="Vance Logo" className="h-8" />
        <motion.div className="relative" whileHover={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 150 }}>
          <Link to={isAppPage ? '/' : '/app'}>
            <button className="px-4 py-2 pl-2 font-semibold text-black rounded-full bg-vanceGreen pr-7">Download App</button>
          </Link>
          <img src="downloadIcon.png" alt="download Logo" className="absolute top-0 right-[5px] mt-[13px] mr-1 h-4 w-4" />
        </motion.div>
      </div>
    </nav>
  )
}

export default Nav