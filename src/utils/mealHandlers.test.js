import { deleteMeal, moveMeal } from './mealHandlers';

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


describe('moveMeal', () => {
  const baseMeals = [
    { id: 1, date: '2024-01-01', mealType: 'Lunch', mealName: 'Pasta' },
    { id: 2, date: '2024-01-02', mealType: 'Dinner', mealName: 'Pizza' },
    { id: 1, date: '2024-01-03', mealType: 'Lunch', mealName: 'Pasta' }, // same id, diff date
  ];

  it('moves a meal to a new date and removes it from the old date', () => {
    const moved = moveMeal(baseMeals, { id: 1, mealType: 'Lunch', mealName: 'Pasta' }, '2024-01-01', '2024-01-04');
    expect(moved).toContainEqual({ id: 1, date: '2024-01-04', mealType: 'Lunch', mealName: 'Pasta' });
    expect(moved).not.toContainEqual({ id: 1, date: '2024-01-01', mealType: 'Lunch', mealName: 'Pasta' });
    // The other meal with id 1, date 2024-01-03 should remain
    expect(moved).toContainEqual({ id: 1, date: '2024-01-03', mealType: 'Lunch', mealName: 'Pasta' });
  });

  it('does not duplicate a meal when moving to a date where it already exists', () => {
    // Add a meal at the target date to start
    const meals = [
      ...baseMeals,
      { id: 1, date: '2024-01-04', mealType: 'Lunch', mealName: 'Pasta' },
    ];
    const moved = moveMeal(meals, { id: 1, mealType: 'Lunch', mealName: 'Pasta' }, '2024-01-01', '2024-01-04');
    // Should only be one meal with id 1 and date 2024-01-04
    const found = moved.filter(m => m.id === 1 && m.date === '2024-01-04');
    expect(found).toHaveLength(1);
  });

  it('does nothing if fromDate does not match any meal', () => {
    const moved = moveMeal(baseMeals, { id: 1, mealType: 'Lunch', mealName: 'Pasta' }, '2099-01-01', '2024-01-05');
    // Should add at toDate, but nothing is removed from the original
    expect(moved).toHaveLength(baseMeals.length + 1);
    expect(moved).toContainEqual({ id: 1, date: '2024-01-05', mealType: 'Lunch', mealName: 'Pasta' });
  });

  it('can move a meal back to a date it was previously on', () => {
    // Move from 2024-01-03 to 2024-01-01, where a meal was deleted earlier
    const meals = [
      { id: 1, date: '2024-01-01', mealType: 'Lunch', mealName: 'Pasta' },
      { id: 1, date: '2024-01-03', mealType: 'Lunch', mealName: 'Pasta' },
    ];
    // Remove meal from 2024-01-01
    const afterDelete = deleteMeal(meals, 1, '2024-01-01');
    // Now move from 2024-01-03 to 2024-01-01
    const movedBack = moveMeal(afterDelete, { id: 1, mealType: 'Lunch', mealName: 'Pasta' }, '2024-01-03', '2024-01-01');
    expect(movedBack).toContainEqual({ id: 1, date: '2024-01-01', mealType: 'Lunch', mealName: 'Pasta' });
    expect(movedBack).not.toContainEqual({ id: 1, date: '2024-01-03', mealType: 'Lunch', mealName: 'Pasta' });
  });
});