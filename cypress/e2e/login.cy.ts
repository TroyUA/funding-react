import { ROUTES } from '../../src/router/routes'

describe('The Login Page', () => {
  it('login via username and password', () => {
    cy.visit(ROUTES.LOGIN)
    cy.get('input[name=teamName]').type('TEST')
    cy.get('input[name=password]').type('123456')
    cy.get('button[type=submit]').click()
  })
})
