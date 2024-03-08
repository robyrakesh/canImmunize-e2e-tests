/// <reference types="Cypress" />

const EMAIL = 'input[type="email"]'
const PASSWORD = 'input[type="password"]'
const LOGIN_BUTTON = 'button[aria-label="Login"]'
const SIGN_UP = '#login-signup-link'
const FORGOT_PASSWORD = '#login-forgot-your-password-link'
const TOAST_MESSAGE = '#toast-container'
const SEND_PASS_RESET = 'button[aria-label="Send Reset Password Email"]'
const VALID_EMAIL_MESSAGE = 'If an account exists with this email, a password reset link has been sent to you.'
const INVALID_EMAIL_MESSAGE = 'We have not found a user with this email and password combination.'


export default class loginPage {

  static login({email, password}) {
    cy.get(EMAIL).type(email);
    cy.get(PASSWORD).type(password);
    cy.get(LOGIN_BUTTON).click();
  }

  static isErrorDisplayed() {
    cy.get(TOAST_MESSAGE).should('have.text', 'Login failed. You must input a valid password.')
  }

  static clickForgotPassword() {
    cy.get(FORGOT_PASSWORD).click()
    cy.url().should('include', '/forgot-password')
  }

  static sendResetPasswordEmail(email) {
    cy.get(EMAIL).type(email);
    cy.get(SEND_PASS_RESET).click()
  }

  static verifyPasswordReset(email) {
    if(email == Cypress.env('email')) {
        cy.get(TOAST_MESSAGE).should('include.text', VALID_EMAIL_MESSAGE)
    } else {
        cy.get(TOAST_MESSAGE).should('include.text', INVALID_EMAIL_MESSAGE)
    }
  }

}
