import { faker } from '@faker-js/faker';
import LoginApi from '../pages/api/LoginApi';
import UsersApi from '../pages/api/UsersApi';
import ProductsApi from '../pages/api/ProductsApi';

describe('Login - ServeRest (API)', () => {
  it('should display validation errors when email and password are empty', () => {
    LoginApi.login().then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.email).to.eq('email é obrigatório');
      expect(response.body.password).to.eq('password é obrigatório');
    });
  });

  it('should display validation error when email is empty', () => {
    LoginApi.login({ password: '123456' }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.email).to.eq('email é obrigatório');
    });
  });

  it('should display validation error when password is empty', () => {
    LoginApi.login({ email: 'test@example.com' }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.password).to.eq('password é obrigatório');
    });
  });

  it('should display validation error for invalid credentials', () => {
    cy.fixture('users').then(({ invalidUser }) => {
      LoginApi.login(invalidUser).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.message).to.eq('Email e/ou senha inválidos');
      });
    });
  });

  it('should display success message for valid admin credentials', () => {
    cy.fixture('users').then(({ validUser }) => {
      LoginApi.login(validUser).then((response) => {
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

    cy.fixture('products').then(({ product }) => {
      UsersApi.create(regularUser).then(() => {
        LoginApi.login({ email: regularUser.email, password: regularUser.password }).then(({ body }) => {
          ProductsApi.create(product, body.authorization).then((response) => {
            expect(response.status).to.eq(403);
            expect(response.body.message).to.eq('Rota exclusiva para administradores');
          });
        });
      });
    });
  });
});
