import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, showDelete, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const style = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderRadius: 5,
    marginBottom: 4
  }

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const like = () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    // the user is added here temporarily since the backend currently does 
    // not return the user after an update in the wanted form
    updateBlog(blog.id, updatedBlog, blog.user)
  }

  const removeBlog = () => {
    deleteBlog(blog.id, blog)
  }

  return (
    <div style={style}>
      {blog.title} {blog.author} <button onClick={toggleShowDetails}>{showDetails ? 'Hide' : 'View'}</button>
      { showDetails ?
          <>
            <br/>{blog.url}
            <br/> Likes: {blog.likes} <button onClick={like}>Like</button>
            <br/>{blog.user.name}
            {showDelete ? <><br/><button onClick={removeBlog}>Remove</button></> : ''}
          </> :
          ''
      }
    </div>
  )
}

export default Blog
