// External libraries
import { useState, useMemo } from 'react';

// Internal project files
import './MealForm.css';
import { formatDate, toLocalDateKey, generateWeekDays, formatWeekRange } from '../utils/dateUtils';
import DraggableMeal from './DraggableMeal';
import DropTargetButton from './DropTargetButton';
import DropZone from './DropZone';
import MonthView from './MonthView';
import MealTemplateLibrary from './MealTemplateLibrary';
import { useCalendar } from '../context/CalendarContext';
import { useTemplates } from '../context/TemplateContext';
import { useMeals } from '../context/MealContext';
import AddMealForm from './AddMealForm';
import EditMealForm from './EditMealForm';


function MealForm() {
    // State for editing and adding meal forms
    const [editingMealId, setEditingMealId] = useState(null);
    const [addingMealDate, setAddingMealDate] = useState(null);
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

    // Templates state & actions from TemplateContext
    const { /* Template actions */ } = useTemplates();

    // Meal state & actions from MealContext
    const { meals, addMeal, updateMeal, deleteMeal, moveMeal, sortedMealsForDateRange } = useMeals();

    // Edit meal handler
    function handleEdit(meal) {
        setEditingMealId(meal.id);
    }

    // Delete meal handler (calls context)
    function handleDelete(mealId, mealDate) {
        deleteMeal(mealId, mealDate);
    }

    // DnD handler (calls context)
    function handleMealDrop(draggedMeal, fromDate, toDate) {
        moveMeal(draggedMeal, fromDate, toDate);
    }

    // Use optimized selector for visible week meals
    const sortedMeals = sortedMealsForDateRange(startDate, endDate);

    // Group meals by date string (YYYY-MM-DD)
    const groupedMeals = useMemo(() => {
        return sortedMeals.reduce((acc, meal) => {
            const mealDate = toLocalDateKey(meal.date);
            if (!acc[mealDate]) {
                acc[mealDate] = [];
                }
            acc[mealDate].push(meal);
            return acc;
        }, {});
    }) 


    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-6xl mx-auto px-4 py-8">

                {/* =================== Edit Meal form =================== */}
                {editingMealId !== null && (
                    <EditMealForm
                        meal={meals.find(m => m.id === editingMealId)}
                        onUpdate={(updatedMeal) => {
                            updateMeal(updatedMeal);
                            setEditingMealId(null);
                        }}
                        onCancel={() => setEditingMealId(null)}
                    />
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
                                        <AddMealForm
                                            dateString={dateString}
                                            onAdd={({ mealType, mealName }) => {
                                                addMeal({
                                                    id: Date.now(),
                                                    date: dateString,
                                                    mealType,
                                                    mealName
                                                });
                                                setAddingMealDate(null);
                                            }}
                                            onCancel={() => setAddingMealDate(null)}
                                        />
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
                                        
                                        {/* Template Picker */}
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

                                                        addMeal(newMeal);

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