// src/hooks/useMealDrag.js
import { useDrag } from 'react-dnd';

/**
 * Hook for draggable meals.
 * @param {Object} meal - The meal object to drag.
 * @returns {[{ isDragging: boolean }, React.Ref]} - drag state and ref.
 */
export function useMealDrag(meal) {
    const [{ isDragging }, dragRef] = useDrag(() => {
        const dragItem = { meal, fromDate: meal.date };
        console.log('[useMealDrag] Drag started:', dragItem);
        return {
            type: 'MEAL',
            item: dragItem,
            collect: (monitor) => ({ isDragging: monitor.isDragging() }),
        };
        
    }, [meal]);

    return [{ isDragging }, dragRef];
}