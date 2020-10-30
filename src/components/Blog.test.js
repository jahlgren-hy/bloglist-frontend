import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'


const other = {
  own: true,
  handleRemove: () => { },
  handleLike: () => { }
}

const blog = {
  title: 'First class tests',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  likes: 5,
  user: [
    { name: 'Arto Hellas' }
  ]
}

test('renders title and author by default', async () => {
  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent(
    'First class tests',
  )

  expect(component.container).toHaveTextContent(
    'First class tests',
  )

  expect(component.container).not.toHaveTextContent(
    'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
  )

  expect(component.container).not.toHaveTextContent(
    'likes'
  )
})

test('clicking the button renders url and likes', async () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      onClick={mockHandler}
    />)

  const button = component.getByText('view')
  expect(button).toBeDefined()
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
  )

  expect(component.container).toHaveTextContent(
    'likes'
  )
})

test('when liked twice, the event handler gets called twice', () => {
  const blog = {
    author: 'Ron Jeffries',
    title: 'You’re NOT gonna need it!',
    url: 'https://ronjeffries.com/xprog/articles/practices/pracnotneed/',
    likes: 3,
    id: 1,
    user: {
      name: 'Arto Hellas'
    }
  }

  other.handleLike = jest.fn()

  const component = render(
    <Blog blog={blog} {...other} />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(other.handleLike.mock.calls.length).toBe(2)
})