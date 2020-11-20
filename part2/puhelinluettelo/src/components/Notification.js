import React from 'react'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <div className={type}>
      {notification}
    </div>
  )
}

export default Notification