import React from 'react'
import LoggedIn from './LoggedIn'
import { Link } from 'react-router-dom'

const NavigationMenu = () => {
    return(
        <div>
            <Link to="/">
                blogs
            </Link>
            <Link to="/users">
                users
            </Link>
            <LoggedIn />
        </div>
    )
}

export default NavigationMenu