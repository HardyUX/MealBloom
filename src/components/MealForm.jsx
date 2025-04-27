// External libraries
import React, { useState } from 'react';

// Internal project files
import './MealForm.css';
import { formatDate, getStartAndEndOfWeek } from '../utils/dateUtils';
import { loadMeals, saveMeals } from '../utils/localStorageUtils';


function MealForm() {
    // State variables
    const [date, setDate] = useState('');
    const [mealType, setMealType] = useState('Breakfast');
    const [mealName, setMealName] = useState('');
    const [meals, setMeals] = useState(() => loadMeals ());
    const [currentWeekStart, setCurrentWeekStart] = useState(() => {
        const today = new Date();
        const { startDate } = getStartAndEndOfWeek(today);
        return startDate;
    });
    const [editingMealId, setEditingMealId] = useState(null);
    const [addingMealDate, setAddingMealDate] = useState(null); // Controls which day's Add Meal form is open


    // Helper functions
    function generateWeekDays(startDate) {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(startDate);
            day.setDate(startDate.getDate() + i);
            days.push(day);
        }
        return days;
    }

    // Function to go to the previous week
    const goToPreviousWeek = () => {
        const newStartOfWeek = new Date(currentWeekStart);
        newStartOfWeek.setDate(currentWeekStart.getDate() - 7); // Move back 7 days
        setCurrentWeekStart(newStartOfWeek);
    }

    // Function to go to the next week
    const goToNextWeek = () => {
        const newStartOfWeek = new Date(currentWeekStart);
        newStartOfWeek.setDate(currentWeekStart.getDate() + 7); // Move forward 7 days
        setCurrentWeekStart(newStartOfWeek);
    }

    function handleAddMeal(e, dateForMeal) {
        e.preventDefault();

        const newMeal = {
            id: Date.now(),
            date: dateForMeal,
            mealType,
            mealName,
        };

    const updatedMeals = [...meals, newMeal];
    setMeals(updatedMeals);
    saveMeals(updatedMeals);

    // Reset form
    setMealName('');
    setMealType('Breakfast');
    setAddingMealDate(null);
    }


    function handleEdit(meal) {
        setEditingMealId(meal.id);
        setDate(meal.date);
        setMealType(meal.mealType);
        setMealName(meal.mealName);
    }

    function handleUpdateMeal(e) {
        e.preventDefault();

        const updatedMeals = meals.map((meal) =>
            meal.id === editingMealId
                ? { ...meal, date, mealType, mealName }
                : meal
        );

        setMeals(updatedMeals);
        saveMeals(updatedMeals);
        setEditingMealId(null);

        // Clear form
        setDate('');
        setMealType('Breakfast');
        setMealName('');
    }

    function handleDelete(mealId) {
        const updatedMeals = meals.filter((meal) => meal.id !== mealId);
        setMeals(updatedMeals);
        saveMeals(updatedMeals);
    }


    // Filter and sort meals for the current week
    const { startDate, endDate } = getStartAndEndOfWeek(currentWeekStart.toISOString());

    const filteredMeals = meals.filter(meal => {
        const mealDate = new Date(meal.date);
        return mealDate >= startDate && mealDate <= endDate;
    });

    // Sort meals by date and meal type
    const sortedMeals = [...filteredMeals].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;

        // If same day, sort by meal type (Breakfast > Lunch > Dinner)
        const mealOrder = { Breakfast: 1, Lunch: 2, Dinner: 3};
        return mealOrder[a.mealType] - mealOrder[b.mealType];
    });

    // Group the sorted meals
    const groupedMeals = sortedMeals.reduce((acc, meal) => {
        const mealDate = meal.date;
        if (!acc[mealDate]) {
            acc[mealDate] = [];
            }
        acc[mealDate].push(meal);
        return acc;
    }, {});


    return (
        <div>
            {/* Global form for updating meals */}
            {editingMealId !== null && (
                <form className="meal-form" onSubmit={handleUpdateMeal} style={{ marginBottom: '20px' }}>
                    <h3>Edit Meal</h3>
                    <input
                        className="meal-input"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <select
                        className="meal-select"
                        value={mealType}
                        onChange={(e) => setMealType(e.target.value)}
                    >
                        <option>Breakfast</option>
                        <option>Lunch</option>
                        <option>Dinner</option>
                    </select>
                    <input
                        className="meal-input"
                        type="text"
                        placeholder="Meal Name"
                        value={mealName}
                        onChange={(e) => setMealName(e.target.value)}
                    />
                    <button type="submit" className="meal-button meal-button-edit">Update Meal</button>
                </form>
            )}


            <h2>Scheduled Meals</h2>

            {/* Navigation between weeks */}
            <button onClick={goToPreviousWeek}>Previous Week</button>
            <button onClick={goToNextWeek}>Next Week</button>

            <h3>Week of {currentWeekStart.toDateString()}</h3> 

            {/* Full week display */}
            {generateWeekDays(currentWeekStart).map((day) => {
                const dateString = day.toISOString().split('T')[0];
                const mealsOnThisDay = groupedMeals[dateString] || [];

                return (
                    <div key={dateString} className="meal-form">
                        <h3>{formatDate(dateString)}</h3>

                        <ul style={{ listStyle: 'none', padding: 0}}>
                            {mealsOnThisDay.map((meal) => (
                                <li key={meal.id} className="meal-item">
                                    <div>
                                        <strong>{meal.mealType}:</strong> {meal.mealName}
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => handleEdit(meal)}
                                            className="meal-button meal-button-edit"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(meal.id)}
                                            className="meal-button meal-button-delete"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Add Meal Button */}
                        {addingMealDate === dateString ? (
                            <form onSubmit={(e) => handleAddMeal(e, dateString)}>
                                <select
                                    value={mealType}
                                    onChange={(e) => setMealType(e.target.value)}
                                >
                                    <option>Breakfast</option>
                                    <option>Lunch</option>
                                    <option>Dinner</option>
                                </select>
                                <input
                                    className="meal-input"
                                    type="text"
                                    placeholder="Meal Name"
                                    value={mealName}
                                    onChange={(e) => setMealName(e.target.value)}
                                />
                                <button type="submit" className="meal-button">Save Meal</button>
                            </form>
                        ) : (
                            <button
                                onClick={() => setAddingMealDate(dateString)}
                                className="add-meal-button"
                            >
                                Add Meal
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );    
}

export default MealForm;