import React,  { useState } from 'react'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'



const BlogForm = ({ blogFormRef, showNotification, createBlog } ) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = event => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const newBlog =
        {
          title: title,
          author: author,
          url: url,
        }
      createBlog(newBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
      showNotification(`a new blog "${newBlog.title}" by ${newBlog.author} added`, 5)
  }

  return(

    <form onSubmit={handleCreate}>
      <h2> create new</h2>
      <div>
                    title:
        <input
          type="text"
          id="title-input"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
                    author:
        <input
          type="text"
          id="author-input"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
                    url:
        <input
          type="text"
          id="url-input"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit" id="create-button">create</button>
    </form>

  )
}

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = {
  showNotification,
  createBlog
}

const ConnectedBlogForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogForm)

export default ConnectedBlogForm