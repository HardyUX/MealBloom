// src/components/WeekView.jsx
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { formatShortWeekday, formatMonthDay, toLocalDateKey, generateWeekDays, isToday } from '../utils/dateUtils';
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
}) {
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
                                <h3
                                    className="mb-1 sm:mb-2 flex flex-col items-center leading-tight"
                                    aria-label={`${day.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric'})}`}
                                >
                                    <span className="text-lg font-bold">{formatShortWeekday(day)}</span>
                                    <span className="text-xs text-base-content/60">{formatMonthDay(day)}</span>
                                </h3>

                                {/* Add Meal Button */}
                                <div className="flex justify-end mt-2">
                                    <button
                                        onClick={() => setAddModalDate(dateString)}
                                        title="Add Meal"
                                        aria-label="Add Meal"
                                        className="btn btn-sm absolute right-4 top-3 z-10 bg-cozy-blue text-gray-900 hover:bg-cozy-dark"
                                    >
                                        <Plus size={20} />
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
                            </DropZone>
                    );
                })}

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