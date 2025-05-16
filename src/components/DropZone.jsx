import { useMealDrop } from '../hooks/useMealDrop';

function DropZone({ dateString, children, onMealDrop }) {
    const [{ isOver }, drop] = useMealDrop(onMealDrop, dateString);

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