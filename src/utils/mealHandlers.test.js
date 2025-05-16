import { deleteMeal } from './mealHandlers';

describe('deleteMeal', () => {
    const baseMeals = [
        { id: 1, date: '2024-01-01', mealType: 'Lunch', mealName: 'Pasta' },
        { id: 2, date: '2024-01-02', mealType: 'Dinner', mealName: 'Pizza' },
        { id: 1, date: '2024-01-03', mealType: 'Lunch', mealName: 'Pasta' }, // same id, diff date
    ];

    it('removes the correct meal when given id and date', () => {
        const result = deleteMeal(baseMeals, 1, '2024-01-01');
        expect(result).toEqual([
            { id: 2, date: '2024-01-02', mealType: 'Dinner', mealName: 'Pizza' },
            { id: 1, date: '2024-01-03', mealType: 'Lunch', mealName: 'Pasta' }
        ]);
    });

    it('does not remove anything if id/date do not match', () => {
        const result = deleteMeal(baseMeals, 999, '2024-01-01');
        expect(result).toEqual(baseMeals);
    });

    it('removes only the meal with matching id and date, not others with same id', () => {
        const result = deleteMeal(baseMeals, 1, '2024-01-03');
        expect(result).toEqual([
            { id: 1, date: '2024-01-01', mealType: 'Lunch', mealName: 'Pasta' },
            { id: 2, date: '2024-01-02', mealType: 'Dinner', mealName: 'Pizza' }
        ]);
    });
});