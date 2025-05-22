// External libraries
import { useState, useMemo } from 'react';

// Internal project files
import './MealForm.css';
import { toLocalDateKey, formatWeekRange } from '../utils/dateUtils';
import DropTargetButton from './DropTargetButton';
import MonthView from './MonthView';
import { useCalendar } from '../context/CalendarContext';
import { useMeals } from '../context/MealContext';
import EditMealForm from './EditMealForm';
import WeekView from './WeekView';


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
                    <WeekView
                        calendarAnchorDate={calendarAnchorDate}
                        groupedMeals={groupedMeals}
                        handleMealDrop={handleMealDrop}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        addMeal={addMeal}
                        addingMealDate={addingMealDate}
                        setAddingMealDate={setAddingMealDate}
                        activeTemplateTargetDate={activeTemplateTargetDate}
                        setActiveTemplateTargetDate={setActiveTemplateTargetDate}
                    /> 
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