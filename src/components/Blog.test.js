import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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

test('renders title and author by default', () => {
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