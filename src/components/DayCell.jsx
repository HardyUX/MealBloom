import { useDrop } from 'react-dnd';
import { toLocalDateKey } from '../utils/dateUtils';
import DraggableMiniMeal from './DraggableMiniMeal';

export default function DayCell({ day, meals, onMealDrop }) {
    const dateKey = day ? toLocalDateKey(day) : null;

    // Hook at the top level
    const [{ isOver }, drop] = useDrop({
        accept: 'MEAL',
        drop: (item) => {
            if (day) onMealDrop(item.meal, dateKey);
        },
        collect: (m) => ({ isOver: m.isOver() }),
    });

    // Filter meals for this single day
    const dayMeals = day
        ? meals.filter(m => toLocalDateKey(m.date) === dateKey)
        : [];

    return (
        <div
            ref={drop}
            className={`min-h-[60px] sm:min-h-[80px] rounded p-1
                ${day ? 'bg-white border border-gray-300' : 'bg-gray-100'}
                ${isOver ? 'bg-blue-100' : ''}`}
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