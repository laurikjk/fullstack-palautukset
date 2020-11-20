describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('ei olemassa')
      cy.get('#password').type('salainen :D')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3001/api/users', user)
      cy.visit('http://localhost:3000')

      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#show-button').click()
      cy.get('#title-input').type('blog title')
      cy.get('#author-input').type('author')
      cy.get('#url-input').type('google.com')
      cy.get('#create-button').click()

      cy.contains('blog title')
    })

    it('A blog can be liked', function() {
      cy.get('#show-button').click()
      cy.get('#title-input').type('blog title')
      cy.get('#author-input').type('author')
      cy.get('#url-input').type('google.com')
      cy.get('#create-button').click()
      cy.get('#showblog-button').click()
      cy.get('#like-button').click()
      cy.contains('Likes: 1')
    })

    it('Blog can be removed by user', function() {
      cy.get('#show-button').click()
      cy.get('#title-input').type('blog title')
      cy.get('#author-input').type('author')
      cy.get('#url-input').type('google.com')
      cy.get('#create-button').click()
      cy.get('#showblog-button').click()
      cy.get('#remove-button').click()
      cy.get('html').should('not.contain', '#showblog-button')
    })
  })
})