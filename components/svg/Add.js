import React from 'react'

const Add = ({ size, color }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 42 42">
      <path d="M42 19H23V0h-4v19H0v4h19v19h4V23h19z" fill={color} />
    </svg>
  )
}

Add.defaultProps = {
  size: 16
}

export default Add
