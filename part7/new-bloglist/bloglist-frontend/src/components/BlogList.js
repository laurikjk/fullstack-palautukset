import React from 'react'
import Blog from './Blog'
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
      <Blog
        key={blog.id}
        blog={blog}
      />
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