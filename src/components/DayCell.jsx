import { useMealDrop } from '../hooks/useMealDrop';
import { toLocalDateKey } from '../utils/dateUtils';
import DraggableMiniMeal from './DraggableMiniMeal';

export default function DayCell({ day, meals, onMealDrop }) {
    const dateKey = day ? toLocalDateKey(day) : null;
    const [{ isOver }, drop] = useMealDrop(onMealDrop, dateKey);

    // Filter meals for this single day
    const dayMeals = day
        ? meals.filter(m => toLocalDateKey(m.date) === dateKey)
                .sort((a, b) => {
                    const order = { Breakfast: 1, Lunch: 2, Dinner: 3};
                    return order[a.mealType] - order[b.mealType];
                })
        : [];

    return (
        <div
            ref={drop}
            className={`min-h-[60px] sm:min-h-[80px] rounded p-1
                ${day ? 'bg-white border border-gray-300' : 'bg-gray-100'}
                ${isOver ? 'bg-blue-100' : ''}`}
            data-date={day ? toLocalDateKey(day) : undefined}
        >
            {day && (
                <>
                    <div className="text-sm font-medium mb-1">{day.getDate()}</div>
                    {dayMeals.map(meal => (
                        <DraggableMiniMeal key={meal.id} meal={meal} />
                    ))}
                </>
            )}
        </div>
    );
}