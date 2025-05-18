import { useMealDrag } from '../hooks/useMealDrag';

/**
 * Draggable mini meal icon for Month View.
 * Uses the unified useMealDrag hook for consistent drag payloads.
 */

function DraggableMiniMeal({ meal }) {
    const [{ isDragging }, drag] = useMealDrag(meal);

    return (
        <div
            ref={drag}
            className="text-xs truncate cursor-move"
            data-testid="DraggableMiniMeal"
            style={{ opacity: isDragging ? 0.5 : 1 }}
            title={meal.mealName}
        >
            {meal.mealType === 'Breakfast'
                ? '🥐'
                : meal.mealType === 'Lunch'
                ? '🥪'
                : '🍝'}{' '}
            {meal.mealName}
        </div>
    );
}

export default DraggableMiniMeal;