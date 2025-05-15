// src/hooks/useMealDrag.js
import { useDrag } from 'react-dnd';

/**
 * Hook for draggable meals.
 * @param {Object} meal - The meal object to drag.
 * @returns {[{ isDragging: boolean }, React.Ref]} - drag state and ref.
 */
export function useMealDrag(meal) {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'MEAL',
        item: { meal },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [meal]);

    return [{ isDragging }, dragRef];
}