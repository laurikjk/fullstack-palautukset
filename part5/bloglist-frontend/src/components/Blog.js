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

    const removeHandler = event => {
      event.preventDefault()

      window.confirm(`Are you sure you want to delete ${blog.title}`)
      ? blogService
        .remove(blog.id)
        .then(result => {
          setBlogs(blogs.filter(b => b.id !== blog.id))
        })
      : console.log('canceled')
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

      <button onClick={removeHandler}>remove</button>
    </div>
  )
}

export default Blog
