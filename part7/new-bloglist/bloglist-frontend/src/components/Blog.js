import React from 'react'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'

const Blog = ({ blog, likeBlog, removeBlog }) => {

  if(!blog) return null

  console.log(blog)

  const likeHandler = (event) => {
    event.preventDefault()
    likeBlog(blog.id)
  }

  const removeHandler = event => {
    event.preventDefault()
    window.confirm(`Are you sure you want to delete ${blog.title}`)
      ? removeBlog(blog.id)
      : console.log('canceled deletion')
  }

  
  return(
    <div>

        <h3>{blog.title}</h3>

      <div>
        <div>
        Author: {blog.author}
        </div>

        <div>
        Likes: {blog.likes}
          <button onClick={likeHandler} id="like-button">like</button>
        </div>

        <div>
        url: {blog.url}
        </div>
        <button onClick={removeHandler} id="remove-button">remove</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog
}

const ConnectedBlog = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)

export default ConnectedBlog
