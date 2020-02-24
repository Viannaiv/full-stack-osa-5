describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Test Person',
      username: 'Tester',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('Log in')
    cy.get('#login-form')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Tester')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Test Person logged in')
    })

    it('fails with incorrect credentials', function() {
      cy.get('#username').type('Tester')
      cy.get('#password').type('salasan')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Test Person logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Tester', password: 'salasana' })
    })

    it('a blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('a_test_title')
      cy.get('#author').type('a_test_author')
      cy.get('#url').type('a_test_url')
      cy.get('#create-blog-button').click()

      cy.contains('a_test_title')
      cy.contains('a_test_author')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'A blog', author: 'blogger', url: 'blog/blog' })
        cy.createBlog({ title: 'Another title', author: 'mystery person', url: 'an url' })
        cy.createBlog({ title: 'Bloggity', author: 'Bliggity', url: 'Blop' })
      })

      it('one can be liked', function () {
        cy.contains('Another title').contains('View').click()
        cy.contains('Another title').contains('Like').click()
        cy.contains('Another title').contains('Likes: 1')
      })
    })
  })
})