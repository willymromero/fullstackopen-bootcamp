import React from 'react'

const Notification = ({ notificationMessage }) => {
  if (Object.keys(notificationMessage).length === 0) {
    return
  };

  return (
    <div className={`${notificationMessage.status}`}>
      {notificationMessage.text}
    </div>
  )
}

export default Notification
