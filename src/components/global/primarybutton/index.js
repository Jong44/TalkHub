import React from 'react'

const PrimaryButton = ({onClick, text, className, type}) => {
  if (type === "submit") {
    return (
      <button type="submit" className={`bg-primary-color text-white rounded-md py-2 mt-5 w-full ${className}`}>
        {text}
      </button>
    )
  }
  return (
    <button onClick={onClick} className={`bg-primary-color text-white rounded-md py-2 mt-5 w-full ${className}`}>
      {text}
    </button>
  )
}

export default PrimaryButton