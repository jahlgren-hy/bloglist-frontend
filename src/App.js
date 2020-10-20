import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setUrl] = useState([])


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

  const addBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url,
    }

    try {
      const newBlog = await blogService
        .create(blog)
      setBlogs(blogs.concat(newBlog))
      console.log(`Lisätty uusi blogi ${newBlog.author}'n ${newBlog.title}`)
      setAuthor('')
      setTitle('')
      setUrl('')
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
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const blogForm = () => (
    <div>
      <p>{user.name} logged in
      <button onClick={handleLogout}>logout</button>
      </p>
      <h2>crete new</h2>
      <form onSubmit={addBlog}>
        <div>
          Title
        <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          Author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          Url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <div>
          <button type="submit">Luo</button>
        </div>
      </form>
      {blogView()}
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
      {user !== null && blogForm()}
    </div>
  )
}

export default App
