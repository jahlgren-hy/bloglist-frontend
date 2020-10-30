import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './forms/BlogForm'
import LoginForm from './forms/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState({ message: null })


  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs)
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window
      .localStorage
      .getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'info') => {
    setMessage({ message, type })
    setTimeout(() => setMessage({ message: null }), 5000)
  }

  const blogFormRef = useRef()

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService
        .create(blog)
      setBlogs(blogs.concat(newBlog))
      notify(`Lisätty uusi blogi ${newBlog.author}'n ${newBlog.title} `)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService
        .login({ username, password, })

      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      notify('wrong credentials!', 'error')
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(error)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
  }

  const blogView = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm onSubmit={addBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(b =>
          <Blog key={b.id} blog={b} />
        )}
    </div>
  )

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  return (
    <div className="App">
      <h1> Blogs</h1>
      <Notification message={message} />
      {user === null && loginForm()}
      {user !== null && blogView()}
    </div>
  )
}

export default App
