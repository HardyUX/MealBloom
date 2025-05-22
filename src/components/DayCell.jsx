import { useMealDrop } from '../hooks/useMealDrop';
import { toLocalDateKey, isToday, isWeekend } from '../utils/dateUtils';
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
    
    // Highlighting logic
    let cellClass = "min-h-[60px] sm:min-h-[80px] rounded p-1 border border-gray-300 bg-white";
    if (!day) cellClass = "bg-gray-100"; // padding cell
    if (day && isToday(day)) cellClass += " ring-2 ring-blue-400"; // highlight today
    if (day && isWeekend(day)) cellClass += " bg-yellow-50"; // shade weekends (subtle)

    if (isOver) cellClass += " bg-blue-100";

    return (
        <div ref={drop} className={cellClass} data-date={dateKey}>
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