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
  const onclick = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      onClick={onclick}
    />)

  let button = component.container.querySelector('.app-blog-button')
  console.log(prettyDOM(button))

  fireEvent.click(button)
  console.log(prettyDOM(component.container))

  //button = component.getByText('like')
  button = component.container.querySelector('.app-blog-likes-button')
  console.log(prettyDOM(button))
  fireEvent.click(button)
  expect(onclick.mock.calls).toHaveLength(0)
})
