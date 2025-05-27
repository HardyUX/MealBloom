import { useMealDrop } from '../hooks/useMealDrop';

function DropZone({ dateString, children, onMealDrop, highlight }) {
    const [{ isOver }, drop] = useMealDrop(onMealDrop, dateString);

    return (
        <div
            ref={drop}
            className={[
                "bg-white border border-gray-200 rounded-lg p-4 mb-6",
                "min-w-[160px] md:min-w-[200px] flex-1",
                isOver ? "bg-blue-100" : "",
                highlight ? "ring-2 ring-blue-400" : ""
            ].join(" ")}
        >
            {children}
        </div>
    );
}

export default DropZone;