import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  let style

  notification.message === ''
    ? style = { display: 'none' }
    : style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
  return (
    <div className="container">
      <Alert>
        {notification.message}  
      </Alert>
    </div>
  )
}

export default Notification