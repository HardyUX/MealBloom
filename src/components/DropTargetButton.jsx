import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { toLocalDateKey } from '../utils/dateUtils';
import { useMeals } from '../context/MealContext';
import { useCalendar } from '../context/CalendarContext';

/**
 * A button that you can click to go prev/next *or* drop a meal onto it
 * to move that meal one week backward/forward.
 * 
 * Props:
 *  - direction: 'previous' | 'next'
 *  - children: your arrow icon or text
 */
export default function DropTargetButton({ direction, children}) {
    const { moveMeal } = useMeals();
    const { goPrevious, goNext } = useCalendar();
    const timeoutRef = useRef(null);


    function cancelHoverTimer() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }

    const  [{ isOver }, drop] = useDrop({
        accept: 'MEAL',
        collect: (monitor) => ({
            isOver: monitor.isOver({ shallow: true}),
        }),
        hover: (item, monitor) => {
            if (!monitor.isOver({ shallow: true })) {
                cancelHoverTimer();
                return;
            }

            if (!timeoutRef.current) {
                timeoutRef.current = setTimeout(() => {
                    direction === 'next' ? goNext() : goPrevious()
                    timeoutRef.current = null;
                }, 800); // Delay before auto-navigation
            }
        },
        drop: (item) => {
            cancelHoverTimer();

            // Compute old/new date keys
            const offSet = direction === 'next' ? 7 : -7;
            const fromKey = toLocalDateKey(item.meal.date);
            const newDate = new Date(item.meal.date);
            newDate.setDate(newDate.getDate() + offSet);
            const toKey = toLocalDateKey(newDate);

            // Actually move the meal, *then* navigate
            moveMeal(item.meal, fromKey, toKey);
            direction === 'next' ? goNext() : goPrevious()
        },
        leave: () => {
            cancelHoverTimer();
        } 
    });

    // Simple click fallback
    const handleClick = () => {
        direction === 'next' ? goNext() : goPrevious()
    }

    return (
            <button
                ref={drop}
                onClick={handleClick}
                className={`btn btn-primary btn-sm text-gray-900 rounded-lg px-3 py-1 transition-transform duration-200
                    ${direction === 'next' ? 'ml-3' : ''}
                    ${isOver ? 'bg-blue-300 scale-105' : 'bg-gray-200 hover:bg-gray-300'}
                    ${isOver ? (direction === 'next' ? 'animate-wiggle-right' : 'animate-wiggle-left') : ''}
                `}
            >
                {children}
            </button>
    );
}