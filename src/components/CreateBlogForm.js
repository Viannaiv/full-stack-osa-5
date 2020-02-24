import React, { useState } from 'react'
import PropTypes from 'prop-types'


const CreateBlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const createNewBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    createBlog(newBlog)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <>
      <h2>Create a new blog</h2>
      <form onSubmit={createNewBlog}>
        <div>
          Title:
          <input
            type="text"
            value={newTitle}
            id="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={newAuthor}
            id="author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={newUrl}
            id="url"
            onChange={handleUrlChange}
          />
        </div>
        <button id='create-blog-button' type="submit">Create</button>
      </form><br/>
    </>
  )
}

CreateBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default CreateBlogForm