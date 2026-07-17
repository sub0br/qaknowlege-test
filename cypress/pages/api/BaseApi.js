/**
 * BaseApi — shared methods inherited by all API Page Objects.
 * Every API class should extend this.
 */
class BaseApi {
  constructor() {
    this.baseUrl = 'https://serverest.dev';
  }

  /**
   * Perform an HTTP request against the ServeRest API.
   * failOnStatusCode is disabled by default since specs assert
   * response.status explicitly, including for 4xx/error scenarios.
   * @param {string} method
   * @param {string} path - relative path (e.g. '/login')
   * @param {object} [body]
   * @param {object} [options] - extra cy.request options (e.g. headers)
   */
  request(method, path, body, options = {}) {
    return cy.request({
      method,
      url: `${this.baseUrl}${path}`,
      body,
      failOnStatusCode: false,
      ...options,
    });
  }
}

module.exports = BaseApi;
