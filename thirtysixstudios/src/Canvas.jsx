import React, { useRef, useEffect, useState } from 'react'
import images from './images'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Canvas = ({ startIndex, numImages, duration, size, top, left, zIndex }) => {
  const canvasRef = useRef(null)
  const [index, setIndex] = useState(startIndex)
  const animationRef = useRef(null)

  useGSAP(() => {
    const animationObject = { value: 0 }
    
    animationRef.current = gsap.to(animationObject, {
      value: numImages - 1, // Animate through numImages frames
      duration: duration,
      ease: "linear",
      repeat: -1,
      onUpdate: function() {
        // Calculate current frame based on animation progress
        const progress = this.progress()
        const currentFrame = Math.round(progress * (numImages - 1))
        const actualIndex = startIndex + currentFrame
        setIndex(actualIndex)
      }
    })
  }, [startIndex, numImages, duration])

  useEffect(() => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // Clear canvas before drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Draw image to fill canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
    
    img.onerror = () => {
      console.error('Failed to load image at index:', index)
    }
    
    // Only set src if image exists in array
    if (images[index] && index < images.length) {
      img.src = images[index]
    }
  }, [index])

  return (
  <canvas 
    ref={canvasRef}
    width={size}
    height={size}
    style={{
      position: 'absolute',
      top: `${top}%`,
      left: `${left}%`,
      width: `${size}px`,
      height: `${size}px`,
      zIndex: zIndex
    }}
    data-scroll
    data-scroll-speed={(Math.random() * 4 - 2).toFixed(1)}
  />
)

}

export default Canvas


