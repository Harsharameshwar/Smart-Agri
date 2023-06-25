describe('Dashboard', () => {
    it('Checks dashboard links', () => {
      // visit 'baseUrl'
      cy.visit('/');
      // assert if we are in good place - search for a 'smarter world phrase
      cy.contains('SMART AGRI');
      // search for a div with 'Teachers' caption, and click it
      cy.get('#contact-us').click();
      // // check if url have changed
      cy.url().should('includes', '/contact-us');
      cy.contains('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet justo lacinia, tempus lectus vitae. Integer a felis et dui aliquet gravida vel non ante. Nullam et placerat elit. Aliquam nec fermentum sapien.');
      // get Login button and click it
      cy.get('#login-url').click();
    //   cy.contains('Login').click()
      // check if url have changed
      cy.url().should('includes', '/login');
      // submit inputs and click submit button
      cy.get("#email-input").type('harsha@gmail.com');
      cy.get("#password-input").type('123456');
      cy.get("#login-button").click();
      // verify that we were redirected
      cy.url({ timeout: 3000 }).should('includes', '/dashboard');
      cy.contains('DASHBOARD');
      cy.contains('Welcome to your dashboard');
      cy.contains('Sensors');
      cy.contains('Soil Moisture Sensor').click()
      cy.url({ timeout: 10000 }).should('includes', '/soilmoisturesensor');
    ////////////////////////////////////////////////////
      cy.contains('Rain Sensor').click();
      cy.url({ timeout: 10000 }).should('includes', '/rainsensor');
    //////////////////////////////////////////////////////////////  
    cy.contains('Climate Sensors').click();
    cy.url({ timeout: 10000 }).should('includes', '/climatesensor');
    ////////////////////////////////////////////////////////////////
    cy.contains('Grid Sensor').click();
    cy.url({ timeout: 10000 }).should('includes', '/gridsensor');
    ////////////////////////////////////////////////////////////////
    cy.contains('Valves Control').click();
    cy.url({ timeout: 20000 }).should('includes', '/valvescontrol');
    cy.get('#first-valve-button').click();
    cy.url({ timeout: 5000 });
    cy.get('#second-valve-button').click();
    ////////////////////////////////////////////////////////////////
    





      
      


    });
  });