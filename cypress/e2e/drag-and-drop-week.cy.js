describe('Meal DnD in Week View', () => {
  it('drags a meal from one day to another', () => {
    cy.visit('/');

    // Seed localStorage with a test meal
    cy.window().then(win => {
      win.localStorage.setItem(
        'meals',
        JSON.stringify([
          {
            id: 1,
            date: '2025-05-13',
            mealType: 'Lunch',
            mealName: 'Pasta'
          }
        ])
      );
    });

    cy.reload();

    // Ensure Week View is shown
    cy.contains('Week View').should('exist').click();

    // Alias for the origin day: the day that contains the seeded meal
    cy.contains('.meal-day-container', 'Tuesday, May 13').as('fromDay');

    // Confirm draggable meal exists
    cy.get('.meal-item').should('exist').first().as('mealItem');

    // Find a meal in the first day column (e.g. "Pasta")
    cy.get('.meal-day-container').eq(2).as('toDay');

    // Drag-and-drop!
    cy.get('@mealItem').drag('@toDay');

    // Assert: meal no longer in first day, but now in target day
    cy.get('@fromDay').should('not.contain.text', 'Pasta');
    cy.get('@toDay').should('contain.text', 'Pasta');
  });
});