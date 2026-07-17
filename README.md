# Cypress POM - ServeRest

E2E test suite using Cypress with the Page Object Model (POM) pattern, covering the login flow of [ServeRest](https://serverest.dev/) through the web interface.

## What was done

### `cypress/pages/BasePage.js`

Base class with reusable methods for any Page Object:

- `visit(path)` — navigates to a relative route.
- `getByDataCy(selector)` — finds elements by the `data-cy` attribute.
- `assertUrl(path)` — validates that the current URL contains a given substring.
- `waitForElement(selector)` — waits for an element to become visible.

Serves as a single point of maintenance for behaviors common to all pages, avoiding duplication across Page Objects.

### `cypress/pages/LoginPage.js`

Page Object for the `/login` screen, extending `BasePage`. It brings together:

- Getters for the form elements (`emailInput`, `passwordInput`, `submitButton`, `registerLink`), located via `data-testid`.
- `open()` — opens the login page.
- `login(email, password)` — fills in and submits the form.
- `assertLoginSuccess()` / `assertLogoutSuccess()` — validate the redirect after login and logout.

### `cypress/e2e/login.cy.js`

Spec that exercises the login flow through the UI using `LoginPage`, covering the scenarios:

- Submitting the form without filling in email and password (required field messages).
- Submitting without email.
- Submitting without password.
- Login with invalid credentials (error message).
- Login with valid administrator credentials (redirect and home page content).
- Logout (return to the login screen).

### `cypress/pages/api/BaseApi.js`

Base class with a reusable `request(method, path, body, options)` method, wrapping `cy.request` against the ServeRest API (`https://serverest.dev`). `failOnStatusCode` is disabled by default so specs can assert `response.status` explicitly, including error scenarios (`400`, `401`, `403`).

### `cypress/pages/api/LoginApi.js`

API Page Object for `POST /login`, extending `BaseApi`:

- `login(credentials)` — sends the given `{ email, password }` payload (defaults to `{}`).

### `cypress/pages/api/UsersApi.js`

API Page Object for `POST /usuarios`, extending `BaseApi`:

- `create(user)` — creates a user from the given payload.

### `cypress/pages/api/ProductsApi.js`

API Page Object for `POST /produtos`, extending `BaseApi`:

- `create(product, authorization)` — creates a product, sending the given bearer token in the `Authorization` header.

### `cypress/e2e/apiLogin.cy.js`

Spec that exercises the login flow directly at the API level, following the same POM structure as `login.cy.js` but using the API Page Objects above (`LoginApi`, `UsersApi`, `ProductsApi`) instead of `cy.request` calls, covering the scenarios:

- Request with blank email and password (required field messages).
- Request with blank email.
- Request with blank password.
- Login with invalid credentials (`401` and error message).
- Login with valid administrator credentials (`200`, success message and `authorization` token).
- Unauthorized access to an admin-only route (`POST /produtos`, using the `products` fixture) with a regular (non-admin) user created on the fly with `@faker-js/faker` (`403` and error message).

### `cypress/fixtures/users.json`

User test data used by the tests, avoiding hardcoded credentials scattered across the code:

- `validUser` — credentials of a valid administrator user.
- `invalidUser` — invalid credentials, used in the login error scenario.

### `cypress/fixtures/products.json`

Test data representing a product payload (`nome`, `preco`, `descricao`, `quantidade`), intended for use in specs that exercise the ServeRest products API (e.g. `POST /produtos`).

### `cypress.config.js`

Added the `experimentalStudio: true` option, enabling **Cypress Studio** — a tool that lets you record interactions with the application (clicks, typing) directly through the Cypress interface and automatically generate test code, speeding up the creation/expansion of specs.
