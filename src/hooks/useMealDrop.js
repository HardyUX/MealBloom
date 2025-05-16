// src/hooks/useMealDrop.js
import { useDrop } from 'react-dnd';

/**
 * Hook for drop zones to accept meals.
 * @param {Function} onDrop - Callback when a meal is dropped.
 * @returns {[{ isOver: boolean}, React.Ref]} - drop state and ref.
 */
export function useMealDrop(onDrop, toDate) {
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: 'MEAL',
        drop: (item) => {
            console.log("[useMealDrop] dropping", { item, toDate });
            onDrop(item.meal, item.fromDate, toDate);
        },
        collect: (monitor) => ({ isOver: monitor.isOver(), }),
    }), [onDrop, toDate]);

    return [{ isOver }, dropRef];
}