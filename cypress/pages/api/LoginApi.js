const BaseApi = require('./BaseApi');

/**
 * LoginApi — API Page Object for POST https://serverest.dev/login
 */
class LoginApi extends BaseApi {
  /**
   * Authenticate against the API.
   * @param {object} [credentials] - e.g. { email, password }
   */
  login(credentials = {}) {
    return this.request('POST', '/login', credentials);
  }
}

module.exports = new LoginApi();
