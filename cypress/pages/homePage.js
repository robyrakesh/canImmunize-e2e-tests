/// <reference types="Cypress" />

const TITLE = '.home__banner-group-text___2taq0'
const FIRST_NAME = '#cnr-first-name-input'
const LAST_NAME = '#cnr-last-name-input'
const NEXT_BUTTON = '#cnr-next-button'
const CITY = 'input[aria-label="City"]'
const DELETE_RECORD = 'button[aria-label="Delete Record"]'


export default class homePage {

  static isUserNameDisplayed(name) {
   cy.get(TITLE).should('include.text', name)
  }

  static createNewRecord({firstName, lastName, sex, relation, city}) {
    cy.get('#skip-to-main-content-focus-point')
    .parent().within(() => cy.get('button').contains('Create New Record').click())
    cy.get(FIRST_NAME).type(firstName)
    cy.get(LAST_NAME).type(lastName)
    cy.contains(sex).click()
    cy.get(NEXT_BUTTON).click()
    cy.contains(relation).click()
    cy.get(NEXT_BUTTON).click()
    cy.get(CITY).type(city)
    cy.get('.autocomplete__suggestion___321YS').first().click()
    cy.get('#cnr-modal-wrapper').within(() => cy.contains('Create New Record').click())
  }

  static verifyNewRecordCreated({firstName, lastName}) {
    cy.get('.mb-2 > :nth-child(1)').should('include.text', `${firstName} ${lastName}`)
  }

  static deleteRecord(firstName) {
    cy.get(':nth-child(1) > .home__record-box___3qpOq').within(() => {
      cy.get('.home__record-box-settings___Sw_Ld').click()
    })
    cy.get(DELETE_RECORD).click()
    cy.get('#delete-record-setting-field--first-name').type(firstName)
    cy.get('#ci-textlink-Done').click()
  }

  static verifyRecordDeleted() {
    cy.contains('You have not yet added any records.').first().should('be.visible')
  }

}
