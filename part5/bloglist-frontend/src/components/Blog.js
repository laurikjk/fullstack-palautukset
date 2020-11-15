import React from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {

  const likeHandler = (event) => {
    event.preventDefault()

    const newBlog = {
      user: blog.user.id,
      likes: blog.likes +1, 
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    blogService
      .update(blog.id, newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(mappedBlog => mappedBlog.id !== blog.id ? mappedBlog : returnedBlog)
      )})
  }

  return(
    <div>
      <div>
        <h3>{blog.title}</h3>
      </div>
      <div>
        Author: {blog.author}
      </div>
      
      <div>
        Likes: {blog.likes}
        <button onClick={likeHandler}>like</button>
      </div>
      
      <div>
        url: {blog.url}
      </div>
    </div>
  )
}

export default Blog
