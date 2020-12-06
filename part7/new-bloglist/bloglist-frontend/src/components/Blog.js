import React from 'react'
import{ useState } from 'react'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'

const Blog = ({ blog, likeBlog, removeBlog, commentBlog }) => {
  const [comment, setComment] = useState('')

  if(!blog) return null

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

  const handleComment = event => {
    event.preventDefault()
    commentBlog(blog.id, comment)
    setComment('')
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

        <div>
          add comment: 
          <form onSubmit={handleComment} >
            <input
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
            <button type="submit">submit</button>
          </form>
        </div>

        <div>
        comments:
        <ul>
            {blog.comments.map(c =>
            <li key={blog.comments.indexOf(c)}>
              {c}
            </li>
            )}
        </ul>
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
  removeBlog,
  commentBlog
}

const ConnectedBlog = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)

export default ConnectedBlog
