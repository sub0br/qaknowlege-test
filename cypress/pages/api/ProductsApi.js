const BaseApi = require('./BaseApi');

/**
 * ProductsApi — API Page Object for POST https://serverest.dev/produtos
 */
class ProductsApi extends BaseApi {
  /**
   * Create a product using the given bearer token.
   * @param {object} product - { nome, preco, descricao, quantidade }
   * @param {string} authorization - value of the Authorization header (e.g. "Bearer ...")
   */
  create(product, authorization) {
    return this.request('POST', '/produtos', product, {
      headers: { Authorization: authorization },
    });
  }
}

module.exports = new ProductsApi();
