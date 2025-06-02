import { useMealDrop } from '../hooks/useMealDrop';

function DropZone({ dateString, children, onMealDrop, highlight }) {
    const [{ isOver }, drop] = useMealDrop(onMealDrop, dateString);

    return (
        <div
            ref={drop}
            className={[
                "card bg-base-100 shadow-md border border-base-200 p-4 mb-6",
                "min-w-[160px] md:min-w-[200px] flex-1 transition-colors",
                isOver ? "bg-primary/10 ring-2 ring-primary" : "",
                highlight ? "ring-2 ring-accent" : ""
            ].join(" ")}
        >
            {children}
        </div>
    );
}

export default DropZone;