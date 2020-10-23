import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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
