// DraggableMiniMeal.jsx
import { useDrag } from 'react-dnd';

function DraggableMiniMeal({ meal }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'MEAL',
        item: { meal, fromDate: meal.date },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className="text-xs truncate cursor-move"
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