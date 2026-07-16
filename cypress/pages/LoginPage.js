const BasePage = require('./BasePage');

/**
 * LoginPage — Page Object for https://front.serverest.dev/login
 *
 * ServeRest uses data-testid attributes on all interactive elements.
 */
class LoginPage extends BasePage {
  // Selectors (data-testid)
  get emailInput()    { return cy.get('[data-testid="email"]'); }
  get passwordInput() { return cy.get('[data-testid="senha"]'); }
  get submitButton()  { return cy.get('[data-testid="entrar"]'); }
  get registerLink()  { return cy.get('[data-testid="cadastrar"]'); }

  /** Navigate to the login page */
  open() {
    this.visit('/login');
  }

  /**
   * Fill in credentials and submit the form.
   * @param {string} email
   * @param {string} password
   */
  login(email, password) {
    this.emailInput.clear().type(email);
    this.passwordInput.clear().type(password);
    this.submitButton.click();
  }

  /** Assert the user was redirected to the home/dashboard after login */
  assertLoginSuccess() {
    cy.url().should('include', '/home');
  }

  assertLogoutSuccess() {
    cy.url().should('include', '/login');
  }

}

module.exports = new LoginPage();
