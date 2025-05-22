import { useMealDrop } from '../hooks/useMealDrop';

function DropZone({ dateString, children, onMealDrop, highlight }) {
    const [{ isOver }, drop] = useMealDrop(onMealDrop, dateString);

    return (
        <div
            ref={drop}
            className={
                `meal-day-container ${isOver ? 'bg-blue-100' : ''} ${highlight ? " ring-2 ring-blue-400" : ""}`}
        >
            {children}
        </div>
    );
}

export default DropZone;