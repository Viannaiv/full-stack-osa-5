import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginForm = ({onSubmit, values, onChange}) => {
  return (
    <>
      <h1>Log in</h1>

      <form onSubmit={onSubmit}>
        <div>
          Username:
          <input
            type="text"
            value={values.username}
            name="Username"
            onChange={onChange.username}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={values.password}
            name="Password"
            onChange={onChange.password}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </>
  )
}

const CreateBlogForm = ({onSubmit, values, onChange}) => {
  return (
    <>
      <h1>Create a new blog</h1>
      <form onSubmit={onSubmit}>
        <div>
          Title:
          <input
            type="text"
            value={values.title}
            name="Title"
            onChange={onChange.title}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={values.author}
            name="Author"
            onChange={onChange.author}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={values.url}
            name="Url"
            onChange={onChange.url}
          />
        </div>
        <button type="submit">Create</button>
      </form><br/>
    </>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception.message)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    const blog = await blogService.create(newBlog)
    setBlogs(blogs.concat(blog))
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  if (user === null) {
    return (
      <LoginForm 
        onSubmit={handleLogin}
        values={{
          username: username,
          password: password
        }}
        onChange={{
          username: ({target}) => setUsername(target.value),
          password: ({target}) => setPassword(target.value)
        }}
      />
    )
  }

  return (
    <div>
      <h1>Blogs</h1>

      <p>
        <span>{user.name} logged in </span> 
        <button onClick={handleLogout}>Log out</button>
      </p>

      <CreateBlogForm 
        onSubmit={handleCreateNewBlog}
        values={{
          title: newTitle,
          author: newAuthor,
          url: newUrl
        }}
        onChange={{
          title: ({target}) => setNewTitle(target.value),
          author: ({target}) => setNewAuthor(target.value),
          url: ({target}) => setNewUrl(target.value)
        }}
      />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App