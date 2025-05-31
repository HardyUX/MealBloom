// External libraries
import { useState, useMemo } from 'react';

// Internal project files
import { toLocalDateKey } from '../utils/dateUtils';
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
            <div className="w-full max-w-[1680px] mx-auto py-4">
                <div className="overflow-x-auto">

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
        </div>  
    );



            
}

export default MealForm;