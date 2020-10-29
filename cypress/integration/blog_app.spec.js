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

      cy.get('.error')
        .should('contain', 'wrong credentials!')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      //  .and('have.css', 'border-style', 'solid')
      cy.get('html')
        .should('not.contain', 'Jukka Ahlgren logged in')
    })
  })


  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'jukka', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Cypress-Can-Be-Simple-Sometimes')
      cy.contains('Luo').click()
      cy.contains('a blog created by cypress')
    })


    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'cypress',
          url: 'https://localhost'
        })
        cy.createBlog({
          title: 'second blog',
          author: 'jukka',
          url: 'https://localhost'
        })
        cy.createBlog({
          title: 'third blog',
          title: 'a blog created by jukka',
          author: 'Geist',
          url: 'https://localhost'
        })
      })

      it('it can be liked', function () {
        cy.contains('first blog')
          .contains('view')
          .click()

        cy.contains('like').click()
        cy.contains('hide').click()
        cy.contains('view').click()
        cy.contains('1 likes')
      })
    })
  })
})
