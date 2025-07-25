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
 *  - className: CSS classes for the button
 *  - children: your arrow icon or text
 */
export default function DropTargetButton({ direction, children, className='', onDropMeal, ...props}) {
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

            if (onDropMeal) {
                onDropMeal(item.meal, fromKey, toKey); // call parent handler
            } else {
                // fallback: moveMeal and navigate as before
                moveMeal(item.meal, fromKey, toKey);
            direction === 'next' ? goNext() : goPrevious();
            }
            
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
                className={`${className} transition-transform duration-200
                    ${direction === 'next' ? 'ml-3' : ''}
                    ${isOver ? 'bg-blue-300 scale-105' : 'bg-gray-200 hover:bg-gray-300'}
                    ${isOver ? (direction === 'next' ? 'animate-wiggle-right' : 'animate-wiggle-left') : ''}
                `}
                {...props}
            >
                {children}
            </button>
    );
}