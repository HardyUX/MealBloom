import React from 'react';
import { useDrop } from 'react-dnd';

function DropZone({ dateString, children, onMealDrop }) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'MEAL',
        drop: (item) => onMealDrop(item.meal, dateString),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            className={`meal-day-container ${isOver ? 'bg-blue-100' : ''}`}
        >
            {children}
        </div>
    );
}

export default DropZone;