import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

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

test('clicking like-button twice', async () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      onClick={mockHandler}
    />)

  const button = component.getByText(/view/i)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(0)

  console.log(prettyDOM(component.container))

  /*
    expect(mockHandler.mock.calls).toHaveLength(1)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)

    const likeButton = component.getByText('like')
    expect(likeButton).toBeDefined()
    fireEvent.click(likeButton)
  */
})
