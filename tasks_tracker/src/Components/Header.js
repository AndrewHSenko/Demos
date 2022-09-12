import React from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ user, onAdd, showAdd }) => { //Same as props.user instead of {}
  const location = useLocation()
  return (
    <header className='header'>
        <h1 style={headerStyle}>Task Tracker for {user}</h1> 
        {location.pathname === '/' && (
          <Button text={showAdd ? 'Close' : 'Add'} onClick={onAdd} color={showAdd ? 'red' : 'steelblue'}/>
        )}
    </header>
  )
}

Header.defaultProps = {
    user: 'You'
}

Header.propTypes = {
    user: PropTypes.string
}

const headerStyle = {
    color: 'white',
    backgroundColor: 'steelblue',
    padding: 5
}

export default Header