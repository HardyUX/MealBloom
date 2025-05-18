import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { loadMeals, saveMeals } from '../utils/localStorageUtils';
import { moveMeal as moveMealUtil, deleteMeal as deleteMealUtil } from '../utils/mealHandlers';

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

    // ---- Filtering, grouping, etc. can go here (with useMemo) ----

    return (
        <MealContext.Provider
            value={{
                meals,
                addMeal,
                updateMeal,
                deleteMeal,
                moveMeal,
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