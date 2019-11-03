import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { showNotification } from '../actions'
import { Notification, Delete } from 'rbx'

function NotificationWrapper({ isNotificationVisible, notificationColor, notificationMessage
                             , showNotification 
                             }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isNotificationVisible) 
        showNotification(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [isNotificationVisible])

  const handleDeleteClick = () => showNotification(false)

  return (
    <Notification color={notificationColor} hidden={!isNotificationVisible}>
      <Delete as="button" onClick={handleDeleteClick} />
      {notificationMessage}
    </Notification>
  )
}

const mapStateToProps = store => ({
  isNotificationVisible: store.uiState.isNotificationVisible,
  notificationMessage: store.uiState.notificationMessage,
  notificationColor: store.uiState.notificationColor,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ showNotification }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NotificationWrapper)