describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Jukka Ahlgren',
      username: 'jukka',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Blogs')
    cy.contains('log in to application')
  })


  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      //  cy.contains('log in to application').click()
      cy.get('#username').type('jukka')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Jukka Ahlgren logged in')
    })

    it('fails with wrong credentials', function () {
      //  cy.contains('log in to application').click()
      cy.get('#username').type('jukka')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('wrong credentials!')
    })
  })


  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('jukka')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Cypress-Can-Be-Simple-Sometimes')
      cy.contains('Luo').click()
      cy.contains('a blog created by cypress')
    })
  })

})
