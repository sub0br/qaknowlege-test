const BaseApi = require('./BaseApi');

/**
 * UsersApi — API Page Object for POST https://serverest.dev/usuarios
 */
class UsersApi extends BaseApi {
  /**
   * Create a user.
   * @param {object} user - { nome, email, password, administrador }
   */
  create(user) {
    return this.request('POST', '/usuarios', user);
  }
}

module.exports = new UsersApi();
