import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlogForm from './CreateBlogForm'

test('<NoteForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <CreateBlogForm createBlog={createBlog} />
  )

  const form = component.container.querySelector('form')
  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')

  fireEvent.change(titleInput, {
    target: { value: 'test_title_input' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'test_author_input' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'test_url_input' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls.length).toBe(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test_title_input' )
  expect(createBlog.mock.calls[0][0].author).toBe('test_author_input' )
  expect(createBlog.mock.calls[0][0].url).toBe('test_url_input' )
})