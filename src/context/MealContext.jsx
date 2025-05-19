import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { loadMeals, saveMeals } from '../utils/localStorageUtils';
import { moveMeal as moveMealUtil, deleteMeal as deleteMealUtil } from '../utils/mealHandlers';
import { toLocalDateKey } from '../utils/dateUtils';

// Create context
const MealContext = createContext();

export function MealProvider({ children }) {
    const [meals, setMeals] = useState(() => loadMeals());

    // Persist meals to localStorage on change
    useEffect(() => {
        saveMeals(meals);
    }, [meals]);

    // ---- CRUD operations ----

    const addMeal = useCallback((newMeal) => {
        setMeals((prev) => [...prev, newMeal]);
    }, []);

    const updateMeal = useCallback((updatedMeal) => {
        setMeals((prev) =>
            prev.map((meal) =>
                meal.id === updatedMeal.id ? { ...meal, ...updatedMeal } : meal
            )
        );
    }, []);

    const deleteMeal = useCallback((mealId, mealDate) => {
        setMeals((prev) => deleteMealUtil(prev, mealId, mealDate));
    }, []);

    // ---- Drag & Drop ----

    const moveMeal = useCallback((draggedMeal, fromDate, toDate) => {
        setMeals((prev) => moveMealUtil(prev, draggedMeal, fromDate, toDate));
    }, []);

    // ---- Optimized selectors (useMemo) ----

    // Usage: mealsForDateRange(startDate, endDate)
    const mealsForDateRange = useCallback((startDate, endDate) => {
        return useMemo(
            () =>
                meals.filter(meal => {
                    const mealDate = new Date(meal.date);
                    return mealDate >= startDate && mealDate <= endDate;
                }),
            [meals, startDate, endDate]
        );
    }, [meals]);

    // Usage: sortedMealsForDateRange(startDate, endDate)
    const sortedMealsForDateRange = useCallback((startDate, endDate) => {
        return useMemo(() => {
            const mealOrder = { Breakfast: 1, Lunch: 2, Dinner: 3};
            return meals
                .filter(meal => {
                    const mealDate = new Date(meal.date);
                    return mealDate >= startDate && mealDate <= endDate;
                })
                .sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    if (dateA < dateB) return -1;
                    if (dateA > dateB) return 1;
                    return mealOrder[a.mealType] - mealOrder[b.mealType];
                });
        }, [meals, startDate, endDate]);
    }, [meals]);


    return (
        <MealContext.Provider
            value={{
                meals,
                addMeal,
                updateMeal,
                deleteMeal,
                moveMeal,
                mealsForDateRange,
                sortedMealsForDateRange,
                setMeals, // Expose if needed, but usually not 
            }}
        >
            {children}
        </MealContext.Provider>
    );
}

export function useMeals() {
    return useContext(MealContext);
}