/// <reference types="Cypress" />

const TITLE = '.home__banner-group-text___2taq0'


export default class homePage {

  static isUserNameDisplayed(name) {
   cy.get(TITLE).should('include.text', name)
  }

}
