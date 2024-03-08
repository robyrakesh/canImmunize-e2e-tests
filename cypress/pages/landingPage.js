/// <reference types="Cypress" />

const LOGIN = '.login-btn.nav-login'
const SEARCH_FIELD = '[type="search"]'
const GET_STARTED = '[aria-label="Get Started"]'


export default class landingPage {

  static navigateToLoginPage() {
    cy.get(LOGIN).should('be.visible').click({force:true})
    cy.url().should('include', '/login')
  }

}
