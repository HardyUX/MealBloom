// EditMealForm.jsx
import { useState, useEffect } from 'react';

export default function EditMealForm({ meal, onUpdate, onCancel }) {
    const [date, setDate] = useState('meal.date');
    const [mealType, setMealType] = useState('meal.mealType');
    const [mealName, setMealName] = useState('meal.mealName');

    // If meal changes, update fields
    useEffect(() => {
        setDate(meal.date);
        setMealType(meal.mealType);
        setMealName(meal.mealName);
    }, [meal]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdate({
            ...meal,
            date,
            mealType,
            mealName,
        });
    }

    return(
        <form className="flex flex-col gap-3 bg-base-100 p-4 rounded-box shadow-md max-w-xs mx-auto" onSubmit={handleSubmit}>
                        <h3 className="text-lg font-semibold mb-2">Edit Meal</h3>
                        <input
                            className="input input-bordered w-full"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <select
                            className="select select-bordered w-full"
                            value={mealType}
                            onChange={(e) => setMealType(e.target.value)}
                        >
                            <option>Breakfast</option>
                            <option>Lunch</option>
                            <option>Dinner</option>
                        </select>
                        <input
                            className="input input-bordered w-full"
                            type="text"
                            placeholder="Meal Name"
                            value={mealName}
                            onChange={(e) => setMealName(e.target.value)}
                        />
                        <div className="flex gap-2 mt-2">
                            <button type="submit" className="btn btn-success">Update Meal</button>
                            <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>                    
                        </div>

        </form>
    );

}