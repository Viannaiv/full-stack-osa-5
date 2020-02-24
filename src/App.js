import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const LoginForm = ({onSubmit, values, onChange}) => {
  return (
    <>
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
      <h2>Create a new blog</h2>
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

const Notification = ({message, error}) => {
  if (message === null && error === null) {
      return null
  } else if (error !== null) {
      return (
          <div className='error'>{error}</div>
      )
  }

  return (
      <div className='notification'>{message}</div>
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
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

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

  const notifyOfSuccess = message => {
    setNotification(message)
      setTimeout(() => {
        setNotification(null)
      }, 4000)
  }

  const notifyOfError = message => {
    setError(message)
      setTimeout(() => {
        setError(null)
      }, 4000)
  }

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
      notifyOfSuccess('login was successful')
    } catch (exception) {
      notifyOfError('wrong username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    setUser(null)
    notifyOfSuccess('logout was successful')
  }

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      createBlogFormRef.current.toggleVisibility()
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')

      notifyOfSuccess(`New blog was added: ${blog.title} by ${blog.author}`)
    } catch (exception) {
      notifyOfError('Something went wrong with creating the new blog')
    }
  }

  if (user === null) {
    return (
      <>
        <h1>Log in</h1>
        <Notification message={notification} error={error} />

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
      </>
    )
  }

  const createBlogFormRef = React.createRef()

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={notification} error={error} />

      <p>
        <span>{user.name} logged in </span> 
        <button onClick={handleLogout}>Log out</button>
      </p>

      <Togglable buttonLabel='New Blog' ref={createBlogFormRef}>
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
      </Togglable><br/>
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App