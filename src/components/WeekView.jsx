// src/components/WeekView.jsx
import { useState } from 'react';
import { formatDate, toLocalDateKey, generateWeekDays, isToday } from '../utils/dateUtils';
import DropZone from './DropZone';
import DraggableMeal from './DraggableMeal';
import AddMealForm from './AddMealForm';
import MealTemplateLibrary from './MealTemplateLibrary';
import AddCreateMealModal from './AddCreateMealModal';

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
    const [addModalDate, setAddModalDate] = useState(null);

    return (
        <div className="bg-cozy min-h-[calc(100vh-80px)] p-2">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
                {generateWeekDays(calendarAnchorDate).map((day) => {
                    const dateString = toLocalDateKey(day);
                    const mealsOnThisDay = groupedMeals[dateString] || [];

                    const isTodayFlag = isToday(day);

                    return (
                            <DropZone
                                className="min-w-[160px] md:min-w-[200px] max-w-full flex-1 rounded-lg bg-cozy-card shadow-sm"
                                key={dateString}
                                dateString={dateString}
                                onMealDrop={handleMealDrop}
                                highlight={isTodayFlag}
                                >
                                <h3 className="font-bold text-base-content mb-1 sm:mb-2">
                                    {formatDate(dateString)}
                                </h3>

                                {/* Add Meal Button */}
                                <div className="flex justify-end mt-2">
                                    <button
                                        onClick={() => setAddModalDate(dateString)}
                                        title="Add Meal"
                                        aria-label="Add Meal"
                                        className="btn btn-sm absolute right-4 top-3 z-10 bg-cozy-blue text-gray-900 hover:bg-cozy-dark"
                                    >
                                        
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </button>
                                </div>

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
                <AddCreateMealModal
                    dateString={addModalDate}
                    isOpen={!!addModalDate}
                    onClose={() => setAddModalDate(null)}
                    onAddMeal={addMeal}
                />
            </div>
        </div>
    );
}

export default WeekView;