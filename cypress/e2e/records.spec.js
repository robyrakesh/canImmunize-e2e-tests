/// <reference types="cypress" />

import { landingPage, loginPage } from '../pages/index'
import { userDetails, recordDetails } from '../fixtures/test_data'
import homePage from '../pages/homePage'

describe('Vaccination Records validation', function () {
    beforeEach(function () {
        cy.visit('/')
        cy.intercept('POST', '/api/v2/login**').as('login')
        cy.intercept('POST', '/api/v2/sync**').as('syncRecord')
        landingPage.navigateToLoginPage()
        loginPage.login(userDetails)
    })

    it('Validate successful record creation', function () {
        //validating user details on home page
        homePage.isUserNameDisplayed(userDetails.name)
        homePage.createNewRecord(recordDetails)
        cy.wait('@syncRecord').its('response.statusCode').should('eq', 200)
        homePage.verifyNewRecordCreated(recordDetails)
    })

    it('Validate successful record deletion', function () {
        //validating user details on home page
        homePage.isUserNameDisplayed(userDetails.name)
        homePage.deleteRecord(recordDetails.firstName)
        cy.wait('@syncRecord').its('response.statusCode').should('eq', 200)
        homePage.verifyRecordDeleted()
    })



})



