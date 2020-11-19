import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'

test('renders content', () => {
  const blog = {
    title: 'blog title',
    author: 'blog author',
    url: 'blog url'
  }

  const component = render(<Blog blog={blog}/>)

  expect(component.container).toHaveTextContent(
    'blog title'
  )
})