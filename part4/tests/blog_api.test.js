const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

describe('blog api tests', () => {
  beforeEach(async () => {
      await Blog.deleteMany({})
      await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs.lenght is correct', async () => {
      const response = await api
        .get('/api/blogs')
      
      expect(JSON.parse(response.text).length).toBe(6)
  })

  test('blog id is id not __id', async () => {
    const blogs = await api
      .get('/api/blogs')

    expect(JSON.parse(blogs.text)[0].id).toBeDefined()
  })

  test('posting a blog increments size of the list', async () =>{
    const before = JSON.parse((await api
      .get('/api/blogs')).text).length

    await api
      .post('/api/blogs')
      .send(new Blog({ _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }))

    const after = JSON.parse((await api
      .get('/api/blogs')).text).length

    expect(after).toBe(before+1)
  })

  test('posting blog without likes makes likes 0', async () =>{
    await api
      .post('/api/blogs')
      .send(new Blog({ _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", __v: 0 }))
    
    const blogs = JSON.parse((await api
      .get('/api/blogs')).text)
    
    expect(blogs[6].likes).toBe(0)
  })

  test('posting blog without title and url gives response 400', async () =>{
    await api
      .post('/api/blogs')
      .send(new Blog({ _id: "5a422a851b54a676234d17f7", author: "Michael Chan", __v: 0 }))
      .expect(400)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})