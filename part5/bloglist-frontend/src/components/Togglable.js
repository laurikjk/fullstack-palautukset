import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  Togglable.displayName = 'Togglable'

  Togglable.propTypes = {
    showButtonLabel: PropTypes.string.isRequired,
    hideButtonLabel: PropTypes.string.isRequired
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <h3>{props.beforeVisible}
          <button onClick={toggleVisibility}>{props.showButtonLabel}</button>
        </h3>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>{props.hideButtonLabel}</button>
      </div>
    </div>
  )
})

export default Togglable