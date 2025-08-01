import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import Canvas from './Canvas'
import data from './data'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import LocomotiveScroll from 'locomotive-scroll'

const App = () => {
  const scrollRef = useRef(null)
  const locomotiveScrollRef = useRef(null)
  const [darkMode, setDarkMode] = useState(true)
  const [canvasesEnabled, setCanvasesEnabled] = useState(false)

  useEffect(() => {
    if (scrollRef.current) {
      locomotiveScrollRef.current = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        multiplier: 1,
        class: 'is-revealed'
      })
    }
    // Cleanup
    return () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy()
      }
    }
  }, [])

  // Apply dark mode class to html element
  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <>
      
      <div className='bg-white dark:bg-black flex flex-row justify-between items-center px-6 py-4 fixed top-0 left-0 right-0 z-[9999]'>
        <div className="text-black dark:text-white text-xl font-bold">
          Brand
        </div>
        <nav className="flex flex-row space-x-8 items-center">
          {[{ name: 'Home', href: '#home' }, { name: 'About', href: '#about' }, { name: 'Contact', href: '#contact' }].map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          {/* Mode Toggle Button */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="ml-4 px-3 py-1 rounded text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 border border-transparent hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-200"
            style={{ fontWeight: 500 }}
            aria-label="Toggle light/dark mode"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </nav>
      </div>

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        data-scroll-container
        className={
          (canvasesEnabled
            ? 'bg-red-600 '
            : 'bg-white dark:bg-black ') +
          'w-full text-neutral-900 dark:text-white relative'
        }
        style={{ paddingTop: '80px' }}
      >
        {/* Canvas Section 1 - Split: Some above, some below text */}
        {canvasesEnabled && (
          <div className="absolute inset-0 w-full h-full pointer-events-none z-30">
            {data[0].slice(0, 3).map((canvasDetails, canvasIndex) => (
              <Canvas
                key={canvasIndex}
                startIndex={canvasDetails.startIndex}
                numImages={canvasDetails.numImages}
                duration={canvasDetails.duration}
                size={canvasDetails.size}
                top={canvasDetails.top}
                left={canvasDetails.left}
                zIndex={canvasDetails.zIndex + 100}
              />
            ))}
          </div>
        )}
        {/* Text Banner */}
        <div className="text-black dark:text-white px-10 py-6 w-full relative z-40" data-scroll data-scroll-speed="-0.5">
          <p className="text-2xl w-[60%] px-[10%] leading-[1.3] text-start font-bold">
            GSAP itself is completely framework-agnostic and can be used in any JS framework without any special wrappers or dependencies.
          </p>
          <p className="text-xs mt-5 w-[70%] px-[10%] leading-[1.2] text-start font-light">
            Define a container as a scope in the config object to ensure that all GSAP selector text inside the the useGSAP() hook will be scoped to the descendants of that container.
          </p>
          <p className="text-sm mt-10 w-[70%] px-[10%] leading-[1.2] text-start font-medium mb-4">
            Scroll
          </p>
        </div>
        {/* Canvas Section 1 - Remaining items below first text */}
        {canvasesEnabled && (
          <div className="absolute w-full h-full pointer-events-none z-20" style={{ top: '300px' }}>
            {data[0].slice(3).map((canvasDetails, canvasIndex) => (
              <Canvas
                key={`below-${canvasIndex}`}
                startIndex={canvasDetails.startIndex}
                numImages={canvasDetails.numImages}
                duration={canvasDetails.duration}
                size={canvasDetails.size}
                top={canvasDetails.top}
                left={canvasDetails.left}
                zIndex={canvasDetails.zIndex}
              />
            ))}
          </div>
        )}
        {/* Hero Section */}
        <div
          className="hero w-full h-fit flex flex-col items-center justify-center py-8 relative z-50 mt-5 mb-5 select-none cursor-pointer"
          data-scroll data-scroll-speed="-0.5"
          onClick={() => setCanvasesEnabled((prev)=>!prev)}
        >
          <h1 className='HERO text-[8rem] font-light text-black dark:text-white text-center mt-5 mb-5'>
            THE MAIN TEXT
          </h1>
          {/* Added content below MAIN TEXT */}
          <div className="w-full flex flex-col items-center mt-8">
            <div className="max-w-2xl w-full px-6">
              <p className="text-lg text-gray font-light dark:text-white mb-4">
                Welcome to the demo page! Click on the MAIN TEXT above to enable the animated canvases!.
              </p>
             
              
              <p className="text-base text-gray-600 dark:text-gray-400 mb-4">
                Scroll down to see the footer and more content.
              </p>
            </div>
          </div>
        </div>
        {/* Canvas Section 2 and other commented sections remain unchanged */}
      </div>

      
      <footer className="bg-white dark:bg-black text-black dark:text-white relative h-full z-[9998] w-full border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Brand</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                Creating immersive digital experiences with cutting-edge technology and innovative design solutions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                  {/* Twitter SVG */}
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                  {/* LinkedIn SVG */}
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {['Web Design', 'Development', 'UI/UX Design', 'Branding', 'Animation'].map((service, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 text-sm">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Bottom Footer */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Brand. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
