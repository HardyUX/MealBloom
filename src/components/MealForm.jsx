// External libraries
import { useState } from 'react';

// Internal project files
import './MealForm.css';
import { formatDate, getStartAndEndOfWeek, toLocalDateKey, generateWeekDays, formatWeekRange } from '../utils/dateUtils';
import { loadMeals, saveMeals } from '../utils/localStorageUtils';
import DraggableMeal from './DraggableMeal';
import DropTargetButton from './DropTargetButton';
import DropZone from './DropZone';
import MonthView from './MonthView';
import MealTemplateLibrary from './MealTemplateLibrary';
import { useCalendar } from '../context/CalendarContext';


function MealForm() {
    // Initialize state for form inputs, meal list, and UI state
    const [date, setDate] = useState('');
    const [mealType, setMealType] = useState('Breakfast');
    const [mealName, setMealName] = useState('');
    const [meals, setMeals] = useState(() => loadMeals ());
    const [activeTemplateTargetDate, setActiveTemplateTargetDate] = useState(null);

    // Calendar state & navigation from context
    const {
        anchorDate: calendarAnchorDate,
        startDate,
        endDate,
        viewMode,
        setViewMode,
        goPrevious: goToPreviousWeek,
        goNext: goToNextWeek
    } = useCalendar();

    // Drop handler
    function handleMealDrop(draggedMeal, newDate) {
        const updatedMeals = meals.map((meal) =>
            meal.id === draggedMeal.id
                ? { ...meal, date: newDate }
                : meal
            );

        setMeals(updatedMeals);
        saveMeals(updatedMeals);
    }

    // Compute the start of the current week (Monday)
    const [editingMealId, setEditingMealId] = useState(null); // ID of meal being edited
    const [addingMealDate, setAddingMealDate] = useState(null); // Which day's form is visible

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

    // Filter meals to only show those in the current visible week
    const filteredMeals = meals.filter(meal => {
        const mealDate = new Date(meal.date);
        return mealDate >= startDate && mealDate <= endDate;
    });

    // Sort by date
    const sortedMeals = [...filteredMeals].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;

        // If same day, sort by meal type (Breakfast > Lunch > Dinner)
        const mealOrder = { Breakfast: 1, Lunch: 2, Dinner: 3};
        return mealOrder[a.mealType] - mealOrder[b.mealType];
    });

    // Group meals by date string (YYYY-MM-DD)
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


                {/* =================== Week Header & Navigation =================== */}
                <h2 className="text-2xl font-bold mb-4">Scheduled Meals</h2>

                <div className="flex gap-2 mb-6">
                    <button
                        className={`px-4 py-2 rounded ${viewMode === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => setViewMode('week')}
                    >
                        Week View
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${viewMode === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => setViewMode('month')}
                    >
                        Month View
                    </button>
                </div>

                {/* Navigation between weeks */}
                <div className="flex items-center justify-between mb-6">
                    {viewMode === 'week' ? (
                        <>
                            <DropTargetButton
                                title="Previous"
                                direction="previous"
                                onClick={goToPreviousWeek}
                                onDropMeal={(meal) => {
                                    const newDate = new Date(meal.date);
                                    newDate.setDate(newDate.getDate() -7); // Move meal to same day last week
                                    handleMealDrop(meal, toLocalDateKey(newDate));
                                    goToPreviousWeek(); // Show updated week
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                </svg>
                            </DropTargetButton>

                            {/* Mobile version (short) */}
                            <h3 className="text-xl font-semibold block sm:hidden">
                                {formatWeekRange(startDate, endDate, { includeYear: false })}
                            </h3>

                            {/* Desktop version (full) */}
                            <h3 className="text-xl font-semibold hidden sm:block">
                                {formatWeekRange(startDate, endDate, { includeYear: true })}
                            </h3>
                            
                            <DropTargetButton
                                title="Next"
                                direction="next"
                                onClick={goToNextWeek}
                                onDropMeal={(meal) => {
                                    const newDate = new Date(meal.date);
                                    newDate.setDate(newDate.getDate() + 7); // Move meal to same day next week
                                    handleMealDrop(meal, toLocalDateKey(newDate));
                                    goToNextWeek(); // Show updated week
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </DropTargetButton>
                        </>
                    ) : (
                        <>
                            <button
                                title="Previous"
                                onClick={goToPreviousWeek}
                                className="px-4 py-2 bg-gray-200 hover: bg-gray-300 rounded"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                </svg>
                            </button>

                            
                            <h3 className="text-xl font-semibold">
                                {calendarAnchorDate.toLocaleString('en-US', { month: 'long', year: 'numeric'})}
                            </h3>

                            <button
                                title="Next"
                                onClick={goToNextWeek}
                                className="px-4 py-2 bg-gray-200 hover: bg-gray-300 rounded"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>

                {/* =================== Daily Meal Cards =================== */}
                {viewMode === 'week' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                        {generateWeekDays(calendarAnchorDate).map((day) => {
                            const dateString = toLocalDateKey(day);
                            const mealsOnThisDay = groupedMeals[dateString] || [];

                            return (
                                <DropZone key={dateString} dateString={dateString} onMealDrop={handleMealDrop}>
                                    <h3 className="meal-day-header text-lg font-bold mb-1 sm:mb-2">{formatDate(dateString)}</h3>

                                    <ul className="meal-list">
                                        {mealsOnThisDay.map((meal) => (
                                            <DraggableMeal
                                                key={meal.id}
                                                meal={meal}
                                                onEdit={handleEdit}
                                                onDelete={handleDelete}
                                            />   
                                        ))}
                                    </ul>

                                    {/* Add Meal Form */}
                                    {addingMealDate === dateString && (
                                        <form onSubmit={(e) => handleAddMeal(e, dateString)} className="meal-form mt-1 sm:mt-2">
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

                                            {/* Save and Cancel Button */}
                                            <div className="flex gap-2">
                                                <button
                                                    type="submit"
                                                    className="text-white bg-green-500 hover:bg-green-600 px-3 py-2 rounded"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                    </svg>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="text-white bg-gray-500 hover:bg-gray-600 px-3 py-2 rounded"
                                                    onClick={() => setAddingMealDate(null)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                        {/* Buttons: Add Meal + Use Template */}
                                        <div className="flex gap-2 mt-1 sm:mt-2">
                                            <button
                                                onClick={() => setAddingMealDate(dateString)}
                                                title="Add Meal"
                                                className="add-meal-btn mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                            >
                                                
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                </svg>
                                            </button>

                                            <button
                                                onClick={() => setActiveTemplateTargetDate(dateString)}
                                                title="Use Template"
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-2 rounded"
                                            >
                                                📄
                                            </button>
                                        </div>
                                        
                                        {/* Template Picker - shown independently */}
                                        {activeTemplateTargetDate === dateString && (
                                            <div className="mt-1 sm:mt-2">
                                                <MealTemplateLibrary
                                                    onUseTemplate={(template) => {
                                                        const newMeal = {
                                                            id: Date.now(),
                                                            date: dateString,
                                                            mealType: template.mealType,
                                                            mealName: template.name
                                                        };

                                                        const updatedMeals = [...meals, newMeal];
                                                        setMeals(updatedMeals);
                                                        saveMeals(updatedMeals);

                                                        // Close the template picker after inserting
                                                        setActiveTemplateTargetDate(null);
                                                    }}
                                                />
                                            </div>
                                        )}
                                </DropZone>
                                
                            );
                        })}
                    </div> 
                )}

                {viewMode === 'month' && (
                    <MonthView
                        meals={meals}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onMealDrop={handleMealDrop}
                    />
                )}

            </div>
        </div>

        
);
            
}

export default MealForm;