/**
 * Moves a meal from one date to another within the meals array.
 * Removes the meal from it's original date and adds it to the target date.
 * Returns the updated meals array.
 */
export function moveMeal(meals, meal, fromDate, toDate) {
    console.log("[moveMeal] called with", { meal, fromDate, toDate });
    const filtered = meals.filter(
        m => !(
            m.id === meal.id && (m.date === fromDate || m.date === toDate)
        )
    );
    console.log("[moveMeal] after filter", filtered);
    const result = filtered.concat([{ ...meal, date: toDate }]);
    console.log("[moveMeal] after concat", result);
    return result;
}

/**
 * Removes a meal by id and date.
 * @param {Array} meals
 * @param {string|number} mealId
 * @param {string} mealDate
 * @returns {Array} updated meals array
 */

export function deleteMeal(meals, mealId, mealDate) {
    return meals.filter(meal => !(meal.id === mealId && meal.date === mealDate));
}