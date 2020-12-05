import React from 'react'
import { connect } from 'react-redux'

const Users = (props) => {
  return (
    <div>
    <h2> Users </h2>  
    {props.users.map(user => {
        const blogAmount = props.blogs.filter(blog => blog.user.id === user.id).length
        props.blogs.map(blog => console.log(blog))
        return(
        <table>
            <tbody>
                <tr key={user.id}>
                    <td>
                        {user.name}
                    </td>
                    <td>
                        {blogAmount}
                    </td>
                </tr>    
            </tbody>
        </table>
        )
    }
    )}
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