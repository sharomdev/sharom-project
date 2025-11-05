
import React from 'react'

const TouchExample = () => {

  const handleTouchStart = () => {
    console.log('Touch started!');
  }

  const handleTouchMove = () => {
    console.log('Finger is moving...');
  }

  const handleTouchEnd = () => {
    console.log('Touch ended!');
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        width: '500px',
        height: '500px',
        backgroundColor: '#e0e0e0',
        textAlign: 'center',
        lineHeight: '250px',
        borderRadius: '10px'
      }}
    >
      Touch Me 
    </div>
  )
}

export default TouchExample
