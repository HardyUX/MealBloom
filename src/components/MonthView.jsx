import { useCalendar } from '../context/CalendarContext';
import DayCell from './DayCell';

function MonthView({ meals, onMealDrop }) {
    // Pull the "anchor" date for current month from context
    const { anchorDate } = useCalendar();
    const monthStart = new Date(anchorDate);
    monthStart.setDate(1); // Make we're starting from the 1st

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

    return (
        <div className="bg-cozy min-h-[calc(100vh-80px)] p-2">
            <div className="grid grid-cols-7 gap-px sm:gap-2 text-center font-semibold mb-1 sm:mb-2">
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-px sm:gap-2" role="grid">
                {days.map((day, i) => (
                    <div key={i} className="rounded-lg shadow-sm min-h-[80px]" role="gridcell">
                        <DayCell
                            day={day}
                            meals={meals}
                            onMealDrop={onMealDrop}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MonthView;