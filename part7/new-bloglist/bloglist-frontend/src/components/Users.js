import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = (props) => {
  return (
    <div>
    <h2> Users </h2>  
    <table>
      <tbody>
        <tr>
          <th>
            user
          </th>
          <th>
            blogs created
          </th>
        </tr>
    {props.users.map(user => {
        const blogAmount = props.blogs.filter(blog => blog.user.id === user.id).length
        return(
          <tr key={user.id}>
            <td>
                <Link to={`/users/${user.id}`}> {user.name} </Link>
            </td>
            <td>
              {blogAmount}
            </td>
          </tr> 
        )
    }
    )}
    
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    users: state.users,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
}

const ConnectedUsers = connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)


export default ConnectedUsers