import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const updateBlog = jest.fn()
  const deleteBlog = jest.fn()
  const showDelete = false
  const blog = {
    title: 'test_title',
    author: 'test_author',
    url: 'test_url/test',
    likes: 2
  }

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        updateBlog={updateBlog}
        showDelete={showDelete}
        deleteBlog={deleteBlog}
      />
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      'test_title'
    )
  })

  test('by default renders title and author but not url or likes', () => {
    expect(component.container).toHaveTextContent(
      'test_title'
    )

    expect(component.container).toHaveTextContent(
      'test_author'
    )

    expect(component.container).not.toHaveTextContent(
      'test_url/test'
    )

    expect(component.container).not.toHaveTextContent(
      'Likes: 2'
    )
  })
})