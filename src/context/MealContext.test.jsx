import { useEffect } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MealProvider, useMeals } from './MealContext';

function makeMeal({ id, date, mealType, mealName }) {
    return { id, date, mealType, mealName }; 
}

// --- Test Consumers ---

function AddConsumer({ meal }) {
    const { meals, addMeal } = useMeals();
    useEffect(() => { addMeal(meal); }, [addMeal, meal]);
    return <div data-testid="meals">{JSON.stringify(meals)}</div>;
}

function UpdateConsumer({ update }) {
    const { meals, updateMeal } = useMeals();
    useEffect(() => { updateMeal(update); }, [updateMeal, update]);
    return <div data-testid="meals">{JSON.stringify(meals)}</div>;
}

function DeleteConsumer({ mealId, mealDate }) {
    const { meals, deleteMeal } = useMeals();
    useEffect(() => { deleteMeal(mealId, mealDate); }, [deleteMeal, mealId, mealDate]);
    return <div data-testid="meals">{JSON.stringify(meals)}</div>;
}

function MoveConsumer({ meal, fromDate, toDate }) {
    const { meals, moveMeal } = useMeals();
    useEffect(() => { moveMeal(meal, fromDate, toDate); }, [moveMeal, meal, fromDate, toDate]);
    return <div data-testid="meals">{JSON.stringify(meals)}</div>;
}

// --- Test Suite ---

describe('MealContext', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    it('adds a meal', async () => {
        const meal = { id: 1, date: '2025-06-01', mealType: 'Dinner', mealName: 'Pizza' };
        
        render(
            <MealProvider>
                <AddConsumer meal={meal} />
            </MealProvider>
        );
        await waitFor(() => {
            expect(screen.getByTestId('meals').textContent).toContain('Pizza');
        });
    });

    it('updates a meal', async () => {
        const origMeal = makeMeal ({ id: 2, date: '2025-06-01', mealType: 'Lunch', mealName: 'Salad' });
        // Pre-load the meal
        localStorage.setItem('meals', JSON.stringify([origMeal]));
        const updatedMeal = makeMeal({ id: 2, date: '2025-06-02', mealType: 'Dinner', mealName: 'Updated'});

        render(
            <MealProvider>
                <UpdateConsumer update={updatedMeal} />
            </MealProvider>
        );
        await waitFor(() => {
            expect(screen.getByTestId('meals').textContent).toContain('Updated');
            expect(screen.getByTestId('meals').textContent).toContain('2025-06-02');
        });
    });

    it('deletes a meal', async () => {
        const meal1 = { id: 3, date: '2025-06-01', mealType: 'Breakfast', mealName: 'Eggs' };
        const meal2 = { id: 4, date: '2025-06-02', mealType: 'Dinner', mealName: 'Steak' };
        localStorage.setItem('meals', JSON.stringify([meal1, meal2]));

        render(
            <MealProvider>
                <DeleteConsumer mealId={4} mealDate={'2025-06-02'} />
            </MealProvider>
        );
        await waitFor(() => {
            expect(screen.getByTestId('meals').textContent).not.toContain('Steak');
            expect(screen.getByTestId('meals').textContent).toContain('Eggs');
        });
    });

    it('moves a meal', async () => {
        const meal = { id: 5, date: '2025-06-03', mealType: 'Lunch', mealName: 'Salad' };
        localStorage.setItem('meals', JSON.stringify([meal]));

        render(
            <MealProvider>
                <MoveConsumer meal={meal} fromDate={'2025-06-03'} toDate={'2025-06-04'} />
            </MealProvider>
        );
        await waitFor(() => {
            expect(screen.getByTestId('meals').textContent).toContain('2025-06-04');
            expect(screen.getByTestId('meals').textContent).not.toContain('2025-06-03');
        });
    });
});