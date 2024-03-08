/// <reference types="cypress" />

import { landingPage, loginPage } from '../pages/index'
import { userDetails } from '../fixtures/test_data'
import homePage from '../pages/homePage'
import { faker } from '@faker-js/faker';

  describe('Validate login', function() {
    beforeEach(function()  {
      cy.visit('/')
      landingPage.navigateToLoginPage()
      cy.intercept('POST', '/api/v2/login**').as('login')
      cy.intercept('POST', '/api/v2/forgot-password**').as('forgotPass')
    })

    it('Validate successful login', function() {
      loginPage.login(userDetails)
      //validating backend response
      cy.wait('@login').then(({response}) => {
        expect(response.statusCode).to.be.eq(200)
        expect(response.body.account.name).to.be.eq(userDetails.name)
        expect(response.body.account.email).to.be.eq(userDetails.email)
      })
      //validating user details on home page
      homePage.isUserNameDisplayed(userDetails.name)
    })

    it('Validate Unsuccessful login', function() {
      const incorrect_userDetails = {
        email: userDetails.email,
        password: 'incorrectPassword'
      }
      loginPage.login(incorrect_userDetails)
      //validating error message 
      loginPage.isErrorDisplayed()
    })

    it('Validate forget password functionality - Password Reset with Valid Email', function() {
      loginPage.clickForgotPassword()
      //validating password reset with valid email
      loginPage.sendResetPasswordEmail(userDetails.email)
      cy.wait('@forgotPass').its('response.statusCode').should('eq', 200)
      loginPage.verifyPasswordReset(userDetails.email)
    })

    it('Validate forget password functionality - Password Reset with Invalid Email', function() {
      const email = faker.internet.email('rem', 'tr', 'gib.com');
      loginPage.clickForgotPassword()
      //validating password reset with valid email
      loginPage.sendResetPasswordEmail(email)
      cy.wait('@forgotPass').its('response.statusCode').should('eq', 400)
      loginPage.verifyPasswordReset(email)
    })

    
  })

  

