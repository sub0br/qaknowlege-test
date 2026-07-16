/**
 * BasePage — shared methods inherited by all Page Objects.
 * Every page class should extend this.
 */
class BasePage {
  /**
   * Navigate to the page's path.
   * @param {string} path - relative URL (e.g. '/login')
   */
  visit(path = '/') {
    cy.visit(path);
  }

  /**
   * Get an element by its data-cy attribute.
   * Using data-* attributes keeps selectors decoupled from CSS/markup changes.
   * @param {string} selector
   */
  getByDataCy(selector) {
    return cy.get(`[data-cy="${selector}"]`);
  }

  /**
   * Assert the current URL contains the given path fragment.
   * @param {string} path
   */
  assertUrl(path) {
    cy.url().should('include', path);
  }

  /**
   * Wait for a specific element to be visible before proceeding.
   * @param {string} selector - CSS selector
   */
  waitForElement(selector) {
    cy.get(selector).should('be.visible');
  }
}

module.exports = BasePage;
