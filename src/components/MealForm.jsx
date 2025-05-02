// External libraries
import React, { useState } from 'react';

// Internal project files
import './MealForm.css';
import { formatDate, getStartAndEndOfWeek, toLocalDateKey } from '../utils/dateUtils';
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
        const start = new Date(startDate);
        const days = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(start);
            day.setDate(start.getDate() + i);
            days.push(day);
        }
        return days;
    }

    // Function to go to the previous week
    const goToPreviousWeek = () => {
        const previousWeek = new Date(currentWeekStart);
        previousWeek.setDate(currentWeekStart.getDate() - 7); // Move back 7 days

        const { startDate } = getStartAndEndOfWeek(previousWeek);
        setCurrentWeekStart(startDate);
    }

    // Function to go to the next week
    const goToNextWeek = () => {
        const nextWeek = new Date(currentWeekStart);
        nextWeek.setDate(currentWeekStart.getDate() + 7); // Move forward 7 days

        const { startDate } = getStartAndEndOfWeek(nextWeek);
        setCurrentWeekStart(startDate);
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
    const { startDate, endDate } = getStartAndEndOfWeek(toLocalDateKey(currentWeekStart));

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
        const mealDate = toLocalDateKey(meal.date);
        if (!acc[mealDate]) {
            acc[mealDate] = [];
            }
        acc[mealDate].push(meal);
        return acc;
    }, {});


    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-6xl mx-auto px-4 py-8">

                {/* Edit Meal form */}
                {editingMealId !== null && (
                    <form className="meal-form" onSubmit={handleUpdateMeal}>
                        <h3 className="text-lg font-semibold mb-2">Edit Meal</h3>
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


                <h2 className="text-2xl font-bold mb-4">Scheduled Meals</h2>

                {/* Navigation between weeks */}
                <div className="flex items-center mb-6">
                    <button
                        onClick={goToPreviousWeek}
                        className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                        </svg>
                        Previous
                    </button>
                    <button
                        onClick={goToNextWeek}
                        className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium ml-3"
                    >
                        Next
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>

                    </button>
                </div>

                {/* Week of Range*/}
                <h3 className="text-xl font-semibold mb-6">
                    Week of {formatDate(toLocalDateKey(startDate))} - {formatDate(toLocalDateKey(endDate))}
                </h3> 

                {/* Full week display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {generateWeekDays(currentWeekStart).map((day) => {
                    const dateString = toLocalDateKey(day);
                    const mealsOnThisDay = groupedMeals[dateString] || [];

                    return (
                        <div key={dateString} className="meal-day-container mb-6 p-4 rounded-lg shadow-sm bg-white">
                            <h3 className="meal-day-header text-lg font-bold mb-2">{formatDate(dateString)}</h3>

                            <ul className="meal-list">
                                {mealsOnThisDay.map((meal) => (
                                    <li
                                        key={meal.id}
                                        className="meal-item flex justify-between items-center mb-2 p-2 bg-gray-100 rounded-md"
                                    >
                                        <div className="flex items-start gap-2">
                                            <span className="text-xl" aria-hidden="true">
                                                {meal.mealType === 'Breakfast' ? '🥐' : meal.mealType === 'Lunch' ? '🥪' : '🍝'}
                                            </span>
                                            <div className="flex flex-col leading-tight">
                                                <span className="text-xs text-gray-500">{meal.mealType}</span>
                                                <span className="text-base font-semibold text-gray-800">{meal.mealName}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEdit(meal)}
                                                className="edit-btn text-green-600 hover:text-green-800"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(meal.id)}
                                                className="delete-btn text-red-600 hover:text-red-800"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {/* Add Meal Button */}
                            {addingMealDate === dateString ? (
                                <form onSubmit={(e) => handleAddMeal(e, dateString)} className="meal-form mt-2">
                                    <select
                                        value={mealType}
                                        onChange={(e) => setMealType(e.target.value)}
                                        className="meal-select"
                                    >
                                        <option>Breakfast</option>
                                        <option>Lunch</option>
                                        <option>Dinner</option>
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="Meal Name"
                                        value={mealName}
                                        onChange={(e) => setMealName(e.target.value)}
                                        className="meal-input"
                                    />
                                    <button type="submit" className="meal-button meal-button-add">Save Meal</button>
                                </form>
                            ) : (
                                <button
                                    onClick={() => setAddingMealDate(dateString)}
                                    className="add-meal-btn mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    );
                })}
            </div> 
        </div>
    </div>

        
);
            
}

export default MealForm;