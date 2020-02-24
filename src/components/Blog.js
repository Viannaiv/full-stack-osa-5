import React, { useState } from 'react'

const Blog = ({ blog }) => {
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

  }

  return (
    <div style={style}>
      {blog.title} {blog.author} <button onClick={toggleShowDetails}>{showDetails ? 'Hide' : 'View'}</button>
      { showDetails ?
          <>
            <br/>{blog.url}
            <br/> Likes: {blog.likes} <button onClick={like}>Like</button>
            <br/>{blog.user.name}
          </> :
          ''
      }
    </div>
  )
}

export default Blog
