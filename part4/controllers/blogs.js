const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')




blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response) => {
     
    const decodedToken = jwt.verify(request.token, process.env.SECRET)  
    if (!request.token || !decodedToken.id) {    
        return response.status(401).json({ error: 'token missing or invalid' })  
    }

    const body = request.body

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        "title": body.title,
        "author": body.author,
        "url": body.url,
        "likes": body.likes,
        "user": user
    })

    if(blog.likes === undefined) blog.likes = 0
    if(blog.title === undefined || blog.url === undefined){
        response.status(400)
    }

    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {    
        return response.status(401).json({ error: 'token missing or invalid' })  
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    user.id.toString() === blog.user.toString()
        ? await Blog.findByIdAndRemove(request.params.id)
        : response.status(401).json({ error: 'token missing or invalid' })

    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.author,
        likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter