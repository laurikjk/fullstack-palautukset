import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

describe('<Blog />', () => {

  let component

  const blog = {
    title: 'blog title',
    author: 'blog author',
    url: 'blog url'
  }

  beforeEach(() => {

    component = render(<Blog blog={blog} />)
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      'blog title'
    )
    expect(component.container).toHaveTextContent(
      'blog author'
    )
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, something displayed', () => {
    const button = component.getByText('info')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('after clicking the button, likes and url are displayed', () => {
    const button = component.getByText('info')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveTextContent('url:')
    expect(div).toHaveTextContent('Likes:')
  })

  // My components have handlers in them so i can't do this
  // here is the code that would work.
  /**
  test('clicking like calls handler', () => {
    const mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} setBlogs={mockHandler} />
    )

    component.debug()

    const button = component.container.querySelector('#blogLikeButton')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
  */

})

