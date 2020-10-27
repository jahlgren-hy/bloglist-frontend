import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const addBlog = jest.fn()
  const component = render(
    <BlogForm onSubmit={addBlog} />
  )

  let input = component.container.querySelector('#title')
  fireEvent.change(input, {
    target: { value: 'testing of forms could be easier' }
  })

  input = component.container.querySelector('#author')
  fireEvent.change(input, {
    target: { value: 'Author' }
  })

  input = component.container.querySelector('#url')
  fireEvent.change(input, {
    target: { value: 'https://localhost' }
  })

  const form = component.container.querySelector('form')

  fireEvent.submit(form)
  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].author).toBe('Author')

  expect(addBlog.mock
    .calls[0][0]
    .title)
    .toBe('testing of forms could be easier')

  expect(addBlog.mock
    .calls[0][0]
    .url)
    .toBe('https://localhost')

})
