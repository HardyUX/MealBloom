describe('Meal Edit in Week View', () => {
  it('edits a meal and updates its properties in the UI', () => {
    cy.visit('/');

    // Seed with a test meal on a visible day
    cy.window().then(win => {
      win.localStorage.setItem(
        'meals',
        JSON.stringify([
          {
            id: 2,
            date: '2025-05-13',
            mealType: 'Lunch',
            mealName: 'Cypress Edit Test'
          }
        ])
      );
    });
    cy.reload();

    // Make sure Week View is active (click if needed)
    cy.contains('Week View').should('exist').click();

    // Alias the day containing the seeded meal
    cy.contains('.meal-day-container', 'Tuesday, May 13').as('mealDay');

    // Assert the meal is present before editing
    cy.get('@mealDay').should('contain.text', 'Cypress Edit Test');

    // Find and click the Edit button for the meal
    cy.get('@mealDay')
      .contains('.meal-item', 'Cypress Edit Test')
      .find('button[title="Edit"]')
      .click();

      // Fill out the edit form
      cy.get('input[type="text"]').clear()
      cy.get('input[type="text"]').type('Edited Salad');
      cy.get('select').select('Dinner');

      // Save changes (the checkmark button)
      cy.get('button[type="submit"]').click();

      // Assert meal is updated in the UI
      cy.get('@mealDay').should('contain.text', 'Edited Salad');
      cy.get('@mealDay').should('contain.text', 'Dinner');
      cy.get('@mealDay').should('not.contain.text', 'Cypress Edit Test');
  });
});