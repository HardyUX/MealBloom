describe('Meal Add in Week View', () => {
  it('adds a meal via the add form and displays it in the correct day', () => {
    cy.visit('/');

    // Make sure Week View is active (click if needed)
    cy.contains('Week View').should('exist').click();

    // Pick a visible day (adjust the label to match your UI, e.g. "Tuesday, May 13")
    cy.contains('.meal-day-container', 'Tuesday, May 13').as('targetDay');

    // Click the Add Meal ("+" button) in the target day
    cy.get('@targetDay').find('button[title="Add Meal"]').click();

    // Fill out the form (adjust selectors if needed)
    cy.get('@targetDay').find('select').select('Dinner');
    cy.get('@targetDay').find('input[type="text"]').type('Cypress Salad');

    // Click the Save button (the checkmark)
    cy.get('@targetDay').find('button[type="submit"]').click();

    // Assert the meal appears in the right day and with the right name/type
    cy.get('@targetDay').should('contain.text', 'Cypress Salad');
    cy.get('@targetDay').should('contain.text', 'Dinner');
  });
});