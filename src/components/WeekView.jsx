// src/components/WeekView.jsx
import { useState } from 'react';
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
}) {
    const [templateModalDate, setTemplateModalDate] = useState(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
            {generateWeekDays(calendarAnchorDate).map((day) => {
                const dateString = toLocalDateKey(day);
                const mealsOnThisDay = groupedMeals[dateString] || [];

                const isTodayFlag = isToday(day);

                return (
                        <DropZone
                            className="min-w-[160px] md:min-w-[200px] max-w-full flex-1"
                            key={dateString}
                            dateString={dateString}
                            onMealDrop={handleMealDrop}
                            highlight={isTodayFlag}
                            >
                            <h3 className="font-bold text-base-content mb-1 sm:mb-2">
                                {formatDate(dateString)}
                            </h3>

                            <ul className="flex flex-col gap-2 mb-2">
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
                                    className="btn btn-primary btn-sm"
                                >
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>

                                <button
                                    onClick={() => setTemplateModalDate(dateString)}
                                    title="Use Template"
                                    className="btn btn-warning btn-sm"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>
                                </button>
                            </div>
                        </DropZone>
                );
            })}
                            {/* Template Picker */}
                                {templateModalDate && (
                                    <dialog id="template-modal" className="modal modal-open">
                                        <div className="modal-box max-w-lg">
                                            <form method="dialog">
                                                <button
                                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                                    onClick={() => setTemplateModalDate(null)}
                                                    aria-label="Close"
                                                >✕</button>
                                            </form>
                                            <MealTemplateLibrary
                                                onUseTemplate={(template) => {
                                                    addMeal ({
                                                        id: Date.now(),
                                                        date: templateModalDate,
                                                        mealType: template.mealType,
                                                        mealName: template.name,
                                                    });

                                                    setTemplateModalDate(null);
                                                }}
                                            />
                                        </div>
                                        {/* Modal overlay to close on click */}
                                        <form method="dialog" className="modal-backdrop">
                                            <button onClick={() => setTemplateModalDate(null)}>close</button>
                                        </form>
                                    </dialog>
                                    
                                )}
        </div>
    );
}

export default WeekView;