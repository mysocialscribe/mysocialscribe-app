import { useState, useEffect } from 'react'

/**
 * Custom React hook that determines if the current window width is less than the specified breakpoint.
 * @param {number} breakpoint - The width threshold to determine if the device is considered mobile. Default is 640.
 * @returns {boolean} - A boolean value indicating if the current window width is less than the breakpoint.
 */
export const useIsMobile = (
  breakpoint: number = 640
): {
  isMobile: boolean
} => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoint])

  return { isMobile }
}
