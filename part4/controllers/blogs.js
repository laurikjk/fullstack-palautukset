const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')  
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)  
    }  
    return null
}


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response) => {

    const token = getTokenFrom(request)  
    console.log(token)
    console.log(process.env.SECRET)
    const decodedToken = jwt.verify(token, process.env.SECRET)  
    if (!token || !decodedToken.id) {    
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
    await Blog.findByIdAndRemove(request.params.id)
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