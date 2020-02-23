import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginForm = ({onSubmit, username, password, onChangePassword, onChangeUsername}) => {
  return (
    <>
      <h1>Log in</h1>

      <form onSubmit={onSubmit}>
        <div>
          Username:
          <input
            type="text"
            value={username}
            name="Username"
            onChange={onChangeUsername}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            name="Password"
            onChange={onChangePassword}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  if (user === null) {
    return (
      <LoginForm 
        onSubmit={handleLogin}
        username={username}
        password={password}
        onChangeUsername={({target}) => setUsername(target.value)}
        onChangePassword={({target}) => setPassword(target.value)}
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

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App