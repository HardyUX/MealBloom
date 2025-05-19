describe('Meal Delete in Week View', () => {
  it('deletes a meal and removes it from the correct day', () => {
    cy.visit('/');

    // Seed localStorage with a test meal for a visible day (adjust date/label as needed)
    cy.window().then(win => {
      win.localStorage.setItem(
        'meals',
        JSON.stringify([
          {
            id: 1,
            date: '2025-05-20', // Match a visible day label
            mealType: 'Lunch',
            mealName: 'Cypress Delete Test'
          }
        ])
      );
    });
    cy.reload();

    // Make sure Week View is active (click if needed)
    cy.contains('Week View').should('exist').click();

    // Alias the day containing the seeded meal
    cy.contains('.meal-day-container', 'Tuesday, May 20').as('mealDay');

    // Assert the meal is present before delete
    cy.get('@mealDay').should('contain.text', 'Cypress Delete Test');

    // Find and click the delete button for the meal
    cy.get('@mealDay')
      .contains('.meal-item', 'Cypress Delete Test')
      .find('button[title="Delete"]')
      .click();

    // Confirm the meal is gone from the day
    cy.get('@mealDay').should('not.contain.text', 'Cypress Delete Test');
  });
});