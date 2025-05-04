import React from 'react';
import { useDrag } from 'react-dnd';

// Resusable components
function DraggableMeal({ meal, onEdit, onDelete}) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'MEAL',
        item: { meal },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <li
            ref={drag}
            style={{ opacity: isDragging ? 0.5 : 1}}
            className="meal-item flex justify-between items-center mb-2 p-2 bg-gray-100 rounded-md"
        >
            <div className="flex items-start gap-2">
                <span className="text-xl" aria-hidden="true">
                    {meal.mealType === 'Breakfast' ? '🥐' : meal.mealType === 'Lunch' ? '🥪' : '🍝'}
                </span>
                <div className="flex flex-col leading-tight">
                    <span className="text-xs text-gray-500">{meal.mealType}</span>
                    <span className="text-base font-semibold text-gray-800">{meal.mealName}</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onEdit(meal)}
                    className="edit-btn text-green-600 hover:text-green-800"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
                    </svg>
                </button>
                <button
                    onClick={() => onDelete(meal.id)}
                    className="delete-btn text-red-600 hover:text-red-800"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            </div>
        </li>
    );
}

export default DraggableMeal;