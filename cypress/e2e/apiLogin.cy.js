import { faker } from '@faker-js/faker';
import LoginPage from '../pages/LoginPage';

const baseUrl = 'https://serverest.dev';
const apiUrl = `${baseUrl}/login`;

describe('Login - ServeRest (API)', () => {
  it('should display validation errors when email and password are empty', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      body: {},
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.email).to.eq('email é obrigatório');
      expect(response.body.password).to.eq('password é obrigatório');
    });
  });

  it('should display validation error when email is empty', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      body: { password: '123456' },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.email).to.eq('email é obrigatório');
    });
  });

  it('should display validation error when password is empty', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      body: { email: 'test@example.com' },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.password).to.eq('password é obrigatório');
    });
  });

  it('should display validation error for invalid credentials', () => {
    cy.fixture('users').then(({ invalidUser }) => {
      cy.request({
        method: 'POST',
        url: apiUrl,
        body: invalidUser,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.message).to.eq('Email e/ou senha inválidos');
      });
    });
  });

  it('should display success message for valid admin credentials', () => {
    cy.fixture('users').then(({ validUser }) => {
      cy.request({
        method: 'POST',
        url: apiUrl,
        body: validUser,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Login realizado com sucesso');
        expect(response.body.authorization).to.match(/^Bearer /);
      });
    });
  });

  it('should display unauthorized access message on admin routes when adding a product', () => {
    const regularUser = {
      nome: faker.person.firstName(),
      email: faker.internet.email(),
      password: 'teste',
      administrador: 'false',
    };

    cy.request('POST', `${baseUrl}/usuarios`, regularUser).then(() => {
      cy.request('POST', apiUrl, {
        email: regularUser.email,
        password: regularUser.password,
      }).then(({ body, product }) => {
        cy.request({
          method: 'POST',
          url: `${baseUrl}/produtos`,
          headers: { Authorization: body.authorization },
          body: product,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(403);
          expect(response.body.message).to.eq('Rota exclusiva para administradores');
        });
      });
    });
  });

});
