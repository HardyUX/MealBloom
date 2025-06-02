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
    let cellClass = "min-h-[60px] sm:min-h-[80px] rounded-lg p-1 border border-base-200 bg-base-100";
    if (!day) cellClass = "bg-base-200"; // padding cell
    if (day && isToday(day)) cellClass += " ring-2 ring-primary"; // highlight today
    if (day && isWeekend(day)) cellClass += " bg-accent/10"; // shade weekends (subtle)

    if (isOver) cellClass += " bg-primary/10";

    return (
        <div ref={drop} className={cellClass} data-date={dateKey}>
            {day && (
                <>
                    <div className="text-sm font-semibold mb-1">{day.getDate()}</div>
                    {dayMeals.map(meal => (
                        <DraggableMiniMeal key={meal.id} meal={meal} />
                    ))}
                </>
            )}
        </div>
    );
}