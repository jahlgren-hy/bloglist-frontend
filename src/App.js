import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './forms/BlogForm'
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

  const addBlog = async (blog) => {
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
      const user = await loginService.login
        ({ username, password, })

      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      notify('wrong credentials!', 'error')
      console.log(error)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
  }


  const blogView = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in
      <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="New blog">
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
    <div>

      <h2> log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Käyttäjätunnus
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Salasana
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
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
