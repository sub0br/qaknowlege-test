import LoginPage from '../pages/LoginPage';

describe('Login - ServeRest', () => {
  beforeEach(() => {
    LoginPage.open();
  });

  it('should display validation errors when email and password are empty', () => {
    LoginPage.submitButton.click();

    cy.contains('Email é obrigatório').should('be.visible');
    cy.contains('Password é obrigatório').should('be.visible');
  });

  it('should display validation errors when password is empty', () => {
    LoginPage.passwordInput.type('123456');
    LoginPage.submitButton.click();

    cy.contains('Email é obrigatório').should('be.visible');
  });

  it('should display validation error when email is empty', () => {
    LoginPage.emailInput.type('test@example.com');
    LoginPage.submitButton.click();

    cy.contains('Password é obrigatório').should('be.visible');
  });

  it('should display validation error for invalid credentials', () => {
    cy.fixture('users').then(({ invalidUser }) => {
      LoginPage.login(invalidUser.email, invalidUser.password);

      cy.contains('Email e/ou senha inválidos').should('be.visible');
    });
  });

  it('should display success message for valid admin credentials', () => {
    cy.fixture('users').then(({ validUser }) => {
      LoginPage.login(validUser.email, validUser.password);
      LoginPage.assertLoginSuccess();

      cy.contains('Fulano').should('be.visible');
      cy.contains('Este é seu sistema para administrar seu ecommerce.').should('be.visible');
    });
  });

  it('should logout successfully', () => {
    cy.fixture('users').then(({ validUser }) => {
      LoginPage.login(validUser.email, validUser.password);
      LoginPage.assertLoginSuccess(); 

      cy.get('[data-testid="logout"]').click();
      LoginPage.assertLogoutSuccess(); 
    });
  });

});
