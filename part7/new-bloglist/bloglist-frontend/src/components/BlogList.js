import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'

const BlogList = (props) => {

  const blogStyle = {
    background: 'white',
    border: 'solid',
    borderWidth: 1,
    color: 'black'
  }

  const sortByLikes = (a, b) => {
    return b.likes - a.likes
  }
  const sortedBlogs = props.blogs.sort(sortByLikes)

  return (sortedBlogs.map(blog =>
    <div style={blogStyle} key={blog.id}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title}
      </Link>
    </div>
    )
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  showNotification
}

const ConnectedBlogList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)

export default ConnectedBlogList