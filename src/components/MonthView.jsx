import { useDrop } from 'react-dnd';
import { toLocalDateKey } from '../utils/dateUtils';
import DraggableMiniMeal from './DraggableMiniMeal';

function MonthView({ meals, currentMonthStart, setCalendarAnchorDate, onMealDrop }) {
    const monthStart = new Date(currentMonthStart);
    monthStart.setDate(1); // Ensure we're starting from the 1st

    const month = monthStart.getMonth();
    const year = monthStart.getFullYear();

    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get total days
    const startDay = (monthStart.getDay() + 6) % 7; // Make monday = 0

    const days = [];

    // Add padding for days before the 1st
    for (let i = 0; i < startDay; i++) {
        days.push(null);
    }

    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
        const day = new Date(year, month, i);
        days.push(day);
    }

    // Add padding to increase array length to 42
    while (days.length < 42) {
        days.push(null);
    }

    console.log(`[DEBUG] Rendering MonthView for: ${monthStart.toDateString()}`);
    console.log(`[DEBUG] days.length: ${days.length}`);

    return (
        <div>
            <div className="grid grid-cols-7 gap-px sm:gap-2 text-center font-semibold mb-1 sm:mb-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-px sm:gap-2">
                {days.map((day, index) => {
                    console.log(`[DEBUG] Day index ${index}:`, day);

                    // Define dateKey
                    const dateKey = day ? toLocalDateKey(day) : `null-${index}`;
                    console.log(`[DEBUG] dateKey: ${dateKey}`);

                    // Call useDrop()
                    const [{ isOver }, drop] = useDrop(() => {
                        console.log(`[DEBUG] useDrop() called at index ${index}`);
                        return {
                            accept: 'MEAL',
                            drop: (item) => {
                                console.log(`[DROP] Meal dropped:`, item.meal);
                                if (day) {
                                    onMealDrop(item.meal, dateKey);
                                }
                            },
                            collect: (monitor) => ({
                                isOver: monitor.isOver(),
                            }),
                        };
                    });

                    // Check if day is null
                    if (!day) {
                        console.log(`[CALENDAR] Empty padding cell at index ${index}`);
                        return (
                            <div
                                key={index}
                                ref={drop}
                                className="min-h-[80px] bg-gray-100 rounded"
                            /> // Empty padding cell
                        );
                    }

                    // Proceed with real day logic
                    const dayMeals = day
                        ? meals.filter(meal => toLocalDateKey(meal.date) === dateKey)
                        : [];

                return (
                    <div
                        key={dateKey}
                        ref={drop}
                        className={`min-h-[80px] border rounded p-1 ${
                            day ? 'bg-white border-gray-300' : 'bg-gray-100 border-transparent'
                        } ${isOver ? 'bg-blue-100' : ''}`}
                    >
                        {day && (
                            <>
                                <div className="text-sm font-medium mb-1">
                                    {day.getDate()}
                                </div>
                                {dayMeals.map(meal => (
                                    <DraggableMiniMeal key={meal.id} meal={meal} />
                                ))}
                            </>
                        )}
                        
                    </div>
                );
                })}
            </div>
        </div>
    );
}

export default MonthView;