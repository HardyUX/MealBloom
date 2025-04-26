// External libraries
import React, { useState } from 'react';

// Internal project files
import { formatDate, getStartAndEndOfWeek } from '../utils/dateUtils';
import { loadMeals, saveMeals } from '../utils/localStorageUtils';


function MealForm() {
    const [date, setDate] = useState('');
    const [mealType, setMealType] = useState('Breakfast');
    const [mealName, setMealName] = useState('');
    const [meals, setMeals] = useState(() => {
        return loadMeals();
    });
    
    const [currentWeekStart, setCurrentWeekStart] = useState(() => {
        const today = new Date();
        const { startDate } = getStartAndEndOfWeek(today);
        return startDate;
    });


    // Function to go to the previous week
    const goToPreviousWeek = () => {
        const newStartOfWeek = new Date(currentWeekStart);
        newStartOfWeek.setDate(currentWeekStart.getDate() - 7); // Move back 7 days
        setCurrentWeekStart(newStartOfWeek);
    };

    // Function to go to the next week
    const goToNextWeek = () => {
        const newStartOfWeek = new Date(currentWeekStart);
        newStartOfWeek.setDate(currentWeekStart.getDate() + 7); // Move forward 7 days
        setCurrentWeekStart(newStartOfWeek);
    };

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

    const [editingMealId, setEditingMealId] = useState(null);


    function handleSubmit(e){
        e.preventDefault();

        if (editingMealId !== null) {
            // Editing existing meal
            const updatedMeals = meals.map(meal =>
                meal.id === editingMealId
                    ? { ...meal, date, mealType, mealName }
                    : meal
            );
            setMeals(updatedMeals);
            saveMeals(updatedMeals);
            setEditingMealId(null); // Exit edit mode
        } else {
            // Adding new meal
            const newMeal = {
                id: Date.now(),
                date,
                mealType,
                mealName,
            };
            const updatedMeals = [...meals, newMeal];
            setMeals(updatedMeals); // update state
            saveMeals(updatedMeals); // save to localStorage
        }

        // Clear form
        setDate('');
        setMealType('Breakfast');
        setMealName('');
    }


    function handleEdit(meal) {
        setEditingMealId(meal.id);
        setDate(meal.date);
        setMealType(meal.mealType);
        setMealName(meal.mealName);
    }


    function handleDelete(mealId) {
        const updatedMeals = meals.filter((meal) => meal.id !== mealId);
        setMeals(updatedMeals);
        localStorage.setItem('meals', JSON.stringify(updatedMeals));
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <select
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value)}
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
                />

                <button type="submit">
                    {editingMealId !== null ? 'Update Meal' : 'Add Meal'}
                </button>
            </form>

            <h2>Scheduled Meals</h2>

            {/* Navigation between weeks */}
            <button onClick={goToPreviousWeek}>Previous Week</button>
            <button onClick={goToNextWeek}>Next Week</button>

            <h3>Week of {currentWeekStart.toDateString()}</h3> 

            {/* Display meals for the current week */}
            {Object.keys(groupedMeals).length === 0 ? (
                <p>No meals scheduled yet.</p>
            ) : (
                Object.entries(groupedMeals).map(([mealDate, mealsOnDate]) => (
                    <div key={mealDate} style={{ marginBottom: '20px'}}>
                        <h3>{formatDate(mealDate)}</h3>
                        <ul style={{ listStyle: 'none', padding: 0}}>
                            {mealsOnDate.map((meal) => (
                                <li
                                    key={meal.id}
                                    style={{
                                        background: '#f0f0f0',
                                        marginBottom: '8px',
                                        padding: '10px',
                                        borderRadius: '6px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div>
                                        <strong>{meal.mealType}:</strong> {meal.mealName}
                                    </div>

                                    <button
                                        onClick={() => handleEdit(meal)}
                                        style={{
                                            padding: '4px 8px',
                                            backgroundColor: '#4caf50',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(meal.id)}
                                        style={{
                                            padding: '4px 8px',
                                            backgroundColor: '#ff5c5c',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>     
                    </div>
                ))
            )}
        </div>
    );    
}

export default MealForm;