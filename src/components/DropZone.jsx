import { useDrop } from 'react-dnd';

function DropZone({ dateString, children, onMealDrop }) {
    console.log("[DropZone] dateString:", dateString);
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'MEAL',
        drop: (item) => {
            console.log("[DropZone] drop", { item, dateString });
            onMealDrop(item.meal, item.fromDate, dateString);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

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