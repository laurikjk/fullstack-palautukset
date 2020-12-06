import React from 'react'
import { connect } from 'react-redux'

const User = ({ user, blogs }) => {
  if(!user) return null
  const blogsByUser = blogs.filter(blog => blog.user.id === user.id)

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
          {blogsByUser.map(blog => 
            <li key={blog.id}>
              {blog.title}
            </li>)}
      </ul>

    </div>
      
  )
}

const mapStateToProps = (state) => {
  return{
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
}

const ConnectedUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(User)

export default ConnectedUser