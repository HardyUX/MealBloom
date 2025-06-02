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
            className={`text-xs w-full truncate cursor-move ${isDragging ? 'opacity-50' : ''}`}
            data-testid="DraggableMiniMeal"
            title={meal.mealName}
        >
            <span>
                {meal.mealType === 'Breakfast'
                    ? '🥐'
                    : meal.mealType === 'Lunch'
                    ? '🥪'
                    : '🍝'}
            </span>{' '}
            {meal.mealName}
        </div>
    );
}

export default DraggableMiniMeal;