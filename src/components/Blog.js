import React, { useState, useEffect } from 'react'

const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false)
  const [value, setValue] = useState('view')

  useEffect(() => {
    showAll ? setValue('hide') : setValue('view')
  }, [showAll])

  const user = window
    .localStorage
    .getItem('loggedAppUser')

  const handleClick = (event) => {
    event.preventDefault()
    setShowAll(!showAll)
  }

  const viewBlog = () => (
    <div>
      <a href={blog.url} rel="noopener noreferrer" target="_blank">
        {blog.url}
      </a>
      <p>
        {blog.likes} likes
        <button type="button">
          like
        </button>
      </p>
      <p className="font-weight-bold">
        {blog.user.name}
      </p>
    </div>
  )

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <button
        type="button"
        onClick={handleClick}
      >{value}
      </button>
      {showAll && viewBlog()}
    </div>
  )
}

export default Blog
