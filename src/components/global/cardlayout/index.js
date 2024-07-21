import React from 'react'

const CardLayout = ({children, className}) => {
  return (
    <div className={`shadow-md bg-white ${className}`}>
        {children}
    </div>
  )
}

export default CardLayout