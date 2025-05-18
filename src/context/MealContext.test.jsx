import { useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import { MealProvider, useMeals } from './MealContext';

// A simple consumer to help us trigger context actions
function TestConsumer({ action, actionArgs, onReady }) {
    const { meals, addMeal, updateMeal, deleteMeal, moveMeal } = useMeals();

    useEffect(() => {
        if (action === 'add') {
            addMeal(...actionArgs);
        }
        if (action === 'update') {
            updateMeal(...actionArgs);
        }
        if (action === 'delete') {
            deleteMeal(...actionArgs);
        }
        if (action === 'move') {
            moveMeal(...actionArgs);
        }
        // Wait a tick, then report back
        setTimeout(() => onReady(meals), 10);
        // eslint-disable-next-line
    }, [action, actionArgs]);

    return <div data-testid="meals-count">{meals.length}</div>;
}

describe('MealContext', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    it('adds a meal', (done) => {
        const meal = { id: 123, date: '2025-06-01', mealType: 'Dinner', mealName: 'Pizza' };

        let result;
        render(
            <MealProvider>
                <TestConsumer action="add" actionArgs={[meal]} onReady={(meals) => { result = meals; done(); }} />
            </MealProvider>
        );

        // The meals list should contain the new meal
        setTimeout(() => {
            expect(result).toEqual([meal]);
        }, 15);
    });

    it('updates a meal', (done) => {
        const meal = { id: 100, date: '2025-06-01', mealType: 'Lunch', mealName: 'OldName' };
        // Pre-load the meal
        localStorage.setItem('meals', JSON.stringify([meal]));

        let result;
        render(
            <MealProvider>
                <TestConsumer
                    action="update"
                    actionArgs={[{ id: 100, date: '2025-06-02', mealType: 'Dinner', mealName: 'NewName' }]}
                    onReady={(meals) => { result = meals; done(); }}
                />
            </MealProvider>
        );

        setTimeout(() => {
            expect(result).toEqual([
                { id: 100, date: '2025-06-02', mealType: 'Dinner', mealName: 'NewName' }
            ]);
        }, 15);
    });

    it('deletes a meal', (done) => {
        const meal1 = { id: 1, date: '2025-06-01', mealType: 'Breakfast', mealName: 'Eggs' };
        const meal2 = { id: 2, date: '2025-06-02', mealType: 'Dinner', mealName: 'Steak' };
        localStorage.setItem('meals', JSON.stringify([meal1, meal2]));

        let result;
        render(
            <MealProvider>
                <TestConsumer
                    action="delete"
                    actionArgs={[2, '2025-06-02']}
                    onReady={(meals) => { result = meals; done(); }}
                />
            </MealProvider>
        );

        setTimeout(() => {
            expect(result).toEqual([
                { id: 77, date: '2025-06-04', mealType: 'Lunch', mealName: 'Salad' }
            ]);
        }, 15);
    });
});