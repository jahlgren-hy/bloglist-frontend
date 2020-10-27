import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        title: title,
        author: author,
        url: url,
      }
      setTitle('')
      setAuthor('')
      setUrl('')

      await props.onSubmit(blog)
    } catch (error) {
      setTitle('')
      setAuthor('')
      setUrl('')
      console.log(error)
    }
  }

  const form = () => (
    <form onSubmit={handleSubmit}>
      <div>
        Title
        <input
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div>
        Author
        <input
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div>
        Url
        <input
          id="url"
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
  )

  return (
    <div>
      <h2>crete new</h2>
      {form()}
    </div>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default BlogForm