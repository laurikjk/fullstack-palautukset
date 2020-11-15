import React from 'react'

const Blog = ({ blog }) => (
  <div>
    <div>
      <h3>{blog.title}</h3>
    </div>
    <div>
      Author: {blog.author}
    </div>
    
    <div>
      Likes: {blog.likes}
    </div>
    
    <div>
      url: {blog.url}
    </div>
  </div>
)

export default Blog
