const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // Base URL for ServeRest front-end
    baseUrl: 'https://front.serverest.dev',

    // Where spec files live
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    // Support file loaded before every spec
    supportFile: 'cypress/support/e2e.js',

    // Screenshot on failure
    screenshotOnRunFailure: true,

    // Video recording during cypress run
    video: false,

    // Viewport
    viewportWidth: 1280,
    viewportHeight: 720,
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      // Add Node event listeners here if needed
      return config;
    },
  },
});
