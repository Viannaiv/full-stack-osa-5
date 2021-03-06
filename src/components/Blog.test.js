import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  let updateBlog
  let deleteBlog
  const showDelete = false
  const blog = {
    title: 'test_title',
    author: 'test_author',
    url: 'test_url/test',
    likes: 2,
    user: {
      name: 'Tester'
    }
  }

  beforeEach(() => {
    updateBlog = jest.fn()
    deleteBlog = jest.fn()

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

  test('renders title, author, url and likes when the View-button is pressed', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'test_title'
    )

    expect(component.container).toHaveTextContent(
      'test_author'
    )

    expect(component.container).toHaveTextContent(
      'test_url/test'
    )

    expect(component.container).toHaveTextContent(
      'Likes: 2'
    )
  })

  test('calls event handler twice when the Like button is pressed twice', () => {
    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(updateBlog.mock.calls.length).toBe(2)
  })
})