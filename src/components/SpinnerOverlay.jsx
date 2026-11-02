import React from 'react'
import { Spinner } from 'react-bootstrap'

const SpinnerOverlay = () => {
  return (
    <div style={overlayStyle}>
      <Spinner animation="border" variant="primary" style={{ width: '4rem', height: '4rem' }} />
    </div>
  )
}

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(255, 255, 255, 0.6)', // transparent white
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export default SpinnerOverlay
