import { toLocalDateKey } from '../../src/utils/dateUtils';

const TEST_DATE = toLocalDateKey(new Date('2025-05-01'));
const OTHER_DATE = toLocalDateKey(new Date('2025-05-02'));

function getDayCellByDateKey(dateKey) {
    return cy.get(`[data-date="${dateKey}"]`);
}

function seedMeals(meals) {
    cy.visit('/', {
        onBeforeLoad(win) {
            win.localStorage.setItem('meals', JSON.stringify(meals));
        }
    });
    cy.contains('Month View').should('exist').click();
}

function assertDayMeals(dateKey, mealNames) {
    getDayCellByDateKey(dateKey).within(() => {
        cy.get('[data-testid="DraggableMiniMeal"]').should('have.length', mealNames.length);
        mealNames.forEach((name, idx) => {
            cy.get('[data-testid="DraggableMiniMeal"]').eq(idx).should('contain.text', name);
        });
    });
}

describe('Month View Drag and Drop', () => {
    beforeEach(() => {
        seedMeals([
            { id: 1, mealName: 'Oats', mealType: 'Breakfast', date: TEST_DATE },
            { id: 2, mealName: 'Wrap', mealType: 'Lunch', date: TEST_DATE },
            { id: 3, mealName: 'Pasta', mealType: 'Dinner', date: TEST_DATE }
        ]);
    });

    it('orders meals as Breakfast -> Lunch -> Dinner by default', () => {
        assertDayMeals(TEST_DATE, ['Oats', 'Wrap', 'Pasta']);
    });

    it('maintains meal order after drag-and-drop', () => {
        getDayCellByDateKey(TEST_DATE).as('dayCell');
        // Drag 'Pasta' (Dinner) to position of 'Oats' (Breakfast)
        cy.get('@dayCell').find('[data-testid="DraggableMiniMeal"]').contains('Pasta').as('dinner');
        cy.get('@dayCell').find('[data-testid="DraggableMiniMeal"]').contains('Oats').as('breakfast');
        cy.get('@dinner').drag('@breakfast');
        assertDayMeals(TEST_DATE, ['Oats', 'Wrap', 'Pasta']);
    });

    it('keeps order after multiple drags', () => {
        getDayCellByDateKey(TEST_DATE).as('dayCell');
        // Drag Lunch (Wrap) to first position
        cy.get('@dayCell').find('[data-testid="DraggableMiniMeal"]').contains('Wrap').as('lunch');
        cy.get('@dayCell').find('[data-testid="DraggableMiniMeal"]').contains('Oats').as('breakfast');
        cy.get('@lunch').drag('@breakfast');
        assertDayMeals(TEST_DATE, ['Oats', 'Wrap', 'Pasta']);

        // Now drag Dinner (Pasta) to second position (between Wrap and Oats)
        cy.get('@dayCell').find('[data-testid="DraggableMiniMeal"]').contains('Pasta').as('dinner');
        cy.get('@dayCell').find('[data-testid="DraggableMiniMeal"]').contains('Oats').as('second');
        cy.get('@dinner').drag('@second');
        assertDayMeals(TEST_DATE, ['Oats', 'Wrap', 'Pasta']);
    });

    /* (skipped because of technical issues with Cypress)
    it.skip('allows a meal to be moved to a different date and back, enforcing order each time', () => {
        // Re-seed both days for this specific test
        seedMeals([
            { id: 1, mealName: 'Oats', mealType: 'Breakfast', date: TEST_DATE },
            { id: 2, mealName: 'Wrap', mealType: 'Lunch', date: TEST_DATE },
            { id: 3, mealName: 'Pasta', mealType: 'Dinner', date: TEST_DATE },
            { id: 4, mealName: 'Cereal', mealType: 'Breakfast', date: OTHER_DATE }
        ]);

        // Alias both days' cells
        getDayCellByDateKey(TEST_DATE).as('day1');
        getDayCellByDateKey(OTHER_DATE).as('day2');
        assertDayMeals(TEST_DATE, ['Oats', 'Wrap', 'Pasta']);
        assertDayMeals(OTHER_DATE, ['Cereal']);

        // Drag 'Pasta' from day1 to day2
        cy.get('@day1').find('[data-testid="DraggableMiniMeal"]').contains('Pasta').as('pasta');
        cy.get('@day2').find('[data-testid="DraggableMiniMeal"]').first().as('target');
        cy.get('@pasta').drag('@target');
        assertDayMeals(TEST_DATE, ['Oats', 'Wrap']);
        assertDayMeals(OTHER_DATE, ['Cereal', 'Pasta']);

        // Now drag 'Pasta' back to day1
        cy.get('@day2').find('[data-testid="DraggableMiniMeal"]').contains('Pasta').as('pastaBack');
        cy.get('@day1').find('[data-testid="DraggableMiniMeal"]').first().as('targetBack');
        cy.get('@pastaBack').drag('@targetBack');
        assertDayMeals(TEST_DATE, ['Oats', 'Wrap', 'Pasta']);
        assertDayMeals(OTHER_DATE, ['Cereal']);
    });
    */
});