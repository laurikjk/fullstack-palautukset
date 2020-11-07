const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

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

afterAll(() => {
  mongoose.connection.close()
})