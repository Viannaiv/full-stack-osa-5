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
})