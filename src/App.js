import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

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
    } catch (exception) {
      console.log('wrong credentials!')
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
  }

  const blogView = () => (
    <div>
      <p>{user.name} logged in
      <button onClick={handleLogout}>logout</button>
      </p>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
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
    <div>
      <h1>Blogs</h1>
      {user === null && loginForm()}
      {user !== null && blogView()}
    </div>
  )
}

export default App
