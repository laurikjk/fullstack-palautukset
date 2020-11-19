import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'

describe('<Blog />', () => {

  let component

  beforeEach(() => {
    const blog = {
      title: 'blog title',
      author: 'blog author',
      url: 'blog url'
    }

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

})