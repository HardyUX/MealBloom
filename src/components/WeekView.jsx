// src/components/WeekView.jsx

import { formatDate, toLocalDateKey, generateWeekDays, isToday } from '../utils/dateUtils';
import DropZone from './DropZone';
import DraggableMeal from './DraggableMeal';
import AddMealForm from './AddMealForm';
import MealTemplateLibrary from './MealTemplateLibrary';

function WeekView({
    calendarAnchorDate,
    groupedMeals,
    handleMealDrop,
    handleEdit,
    handleDelete,
    addMeal,
    addingMealDate,
    setAddingMealDate,
    activeTemplateTargetDate,
    setActiveTemplateTargetDate,
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {generateWeekDays(calendarAnchorDate).map((day) => {
                const dateString = toLocalDateKey(day);
                const mealsOnThisDay = groupedMeals[dateString] || [];

                const isTodayFlag = isToday(day);

                return (
                        <DropZone
                            key={dateString}
                            dateString={dateString}
                            onMealDrop={handleMealDrop}
                            highlight={isTodayFlag}
                            >
                            <h3 className="meal-day-header text-lg font-bold mb-1 sm:mb-2">
                                {formatDate(dateString)}
                            </h3>

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
                                            mealName,
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
                                    className="use-template-btn mt-2 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>
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
                                                mealName: template.name,
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
    );
}

export default WeekView;