import React, { useState, useRef } from 'react'

const ScrollToTopExample = () => {
  const [showButton, setShowButton] = useState(false)
  const divRef = useRef(null)

  const handleScroll = () => {
    const scrollTop = divRef.current.scrollTop
    setShowButton(scrollTop > 100) // show button if scrolled down
  }

  const scrollToTop = () => {
    divRef.current.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      ref={divRef}
      onScroll={handleScroll}
      style={{
        height: '250px',
        overflowY: 'scroll',
        border: '1px solid gray',
        padding: '10px',
        position: 'relative'
      }}
    >
      <div style={{ height: '700px' }}>
        <p>Scroll down to see the "Back to Top" button.</p>
        <p>Lots of content here...gggggggggggggggg</p>
        <p>Keep scrolling...</p>
      </div>

      {showButton && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
          }}
        >
          Top
        </button>
      )}
    </div>
  )
}

export default ScrollToTopExample
