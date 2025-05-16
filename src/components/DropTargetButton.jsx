import { useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { toLocalDateKey } from '../utils/dateUtils';

function DropTargetButton({ direction, onClick, onDropMeal, children}) {
    const timeoutRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

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
                setIsHovering(false);
                return;
            }

            if (!timeoutRef.current) {
                timeoutRef.current = setTimeout(() => {
                    onClick(); // Navigate to next/previous week
                    timeoutRef.current = null; // Reset
                }, 800); // Delay before auto-navigation
            }

            setIsHovering(true);

        },
        drop: (item) => {
            cancelHoverTimer();

            const offSet = direction === 'next' ? 7 : -7;
            const newDate = new Date(item.meal.date);
            newDate.setDate(newDate.getDate() + offSet);

            onDropMeal(item.meal, toLocalDateKey(newDate));
        },
        leave: () => {
            cancelHoverTimer(),
            setIsHovering(false);
        } 
    });

    return (
            <button
                ref={drop}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-transform duration-200
                    ${direction === 'next' ? 'ml-3' : ''}
                    ${isOver ? 'bg-blue-300 scale-105' : 'bg-gray-200 hover:bg-gray-300'}
                    ${isOver ? (direction === 'next' ? 'animate-wiggle-right' : 'animate-wiggle-left') : ''}
                `}
                onClick={onClick}
            >
                {children}
            </button>
    );
}

export default DropTargetButton;