// src/hooks/useMealDrop.js
import { useDrop } from 'react-dnd';

/**
 * Hook for drop zones to accept meals.
 * @param {Function} onDrop - Callback when a meal is dropped.
 * @returns {[{ isOver: boolean}, React.Ref]} - drop state and ref.
 */
export function useMealDrop(onDrop) {
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: 'MEAL',
        drop: (item) => onDrop(item.meal),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }), [onDrop]);

    return [{ isOver }, dropRef];
}