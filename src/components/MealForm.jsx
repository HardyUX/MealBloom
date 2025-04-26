import React, { useState } from 'react';

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
       weekday: 'long',
       month: 'short',
       day: 'numeric', 
    });
}

function getStartAndEndOfWeek(date) {
    // Get start of the week (Sunday)
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = day === 0 ? -6 : 1 - day; // If Sunday (O), go back 6 days
    startDate.setDate(startDate.getDate() + diff); // Start of the week (Sunday)
    startDate.setHours(0, 0, 0, 0); // Clear time to 00:00:00

    // Get end of the week (Saturday)
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // End of week (Saturday)
    endDate.setHours(23, 59, 59, 999); // Set to 23:59:59

    return { startDate, endDate };
}

function MealForm() {
    const [date, setDate] = useState('');
    const [mealType, setMealType] = useState('Breakfast');
    const [mealName, setMealName] = useState('');
    const [meals, setMeals] = useState(() => {
        // Load meals from localStorage when component mounts
        const storedMeals = localStorage.getItem('meals');
        return storedMeals ? JSON.parse(storedMeals) : [];
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

    // Debug: Log the start and end of the week for comparison
    console.log("Start of week:", startDate);
    console.log("End of the week", endDate);

    const filteredMeals = meals.filter(meal => {
        const mealDate = new Date(meal.date);

        // Debug: Log the date of each meal to ensure correct comparisons
        console.log("Meal date:", meal.date, "Meal date object:", mealDate);

        return mealDate >= startDate && mealDate <= endDate;
    });

    const groupedMeals = filteredMeals.reduce((acc, meal) => {
        const mealDate = meal.date;
        if (!acc[mealDate]) {
            acc[mealDate] = [];
            }
        acc[mealDate].push(meal);
        return acc;
    }, {});

    function handleSubmit(e){
        e.preventDefault();

        const newMeal = {
            id: Date.now(),
            date,
            mealType,
            mealName,
        };

        const updatedMeals = [...meals, newMeal];
        setMeals(updatedMeals); // update state
        localStorage.setItem('meals', JSON.stringify(updatedMeals)); // save to storage

        // Clear form
        setDate('');
        setMealType('Breakfast');
        setMealName('');
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

                <button type="submit">Add Meal</button>
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