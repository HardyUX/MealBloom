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
        <form className="meal-form" onSubmit={handleSubmit}>
                        <h3 className="text-lg font-semibold mb-2">Edit Meal</h3>
                        <input
                            className="meal-input"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <select
                            className="meal-select"
                            value={mealType}
                            onChange={(e) => setMealType(e.target.value)}
                        >
                            <option>Breakfast</option>
                            <option>Lunch</option>
                            <option>Dinner</option>
                        </select>
                        <input
                            className="meal-input"
                            type="text"
                            placeholder="Meal Name"
                            value={mealName}
                            onChange={(e) => setMealName(e.target.value)}
                        />
                        <div className="flex gap-2">
                            <button type="submit" className="meal-button meal-button-edit">Update Meal</button>
                            <button type="button" className="meal-button meal-button-cancel" onClick={onCancel}>Cancel</button>                    
                        </div>

        </form>
    );

}