import React,  { useState } from 'react'



const BlogForm = ( { blogs, setBlogs, notifyWith, setNotification, blogService, blogFormRef } ) => {

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
        blogService
            .create(newBlog)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setTitle('')
                setAuthor('')
                setUrl('')
                notifyWith(`a new blog "${returnedBlog.title}" by ${returnedBlog.author} added`)
                setTimeout(() =>{
                setNotification(null)
                }, 5000)
        })
    }
    
    return(
            
            <form onSubmit={handleCreate}>
                <h2> create new</h2>
                <div>
                    title: 
                    <input
                        type="text"
                        value={title}
                        name="title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author: 
                    <input
                        type="text"
                        value={author}
                        name="author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url: 
                    <input
                        type="text"
                        value={url}
                        name="url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                    <button type="submit">create</button>
            </form>

    )
}

export default BlogForm