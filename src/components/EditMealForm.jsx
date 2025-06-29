// EditMealForm.jsx
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

export default function EditMealForm({ meal, onUpdate, onCancel }) {
    const [date, setDate] = useState(meal.date);
    const [mealType, setMealType] = useState(meal.mealType);
    const [mealName, setMealName] = useState(meal.mealName);
    const [errors, setErrors] = useState({});

    // If meal changes, update fields and clear errors
    useEffect(() => {
        if (meal) {
            setDate(meal.date);
            setMealType(meal.mealType);
            setMealName(meal.mealName);
            setErrors({});
        }
    }, [meal]);

    function handleSubmit(e) {
        e.preventDefault();

        // Sanitize and validate all relevant fields
        const sanitizedName = DOMPurify.sanitize(mealName.trim());
        const validationErrors = {};

        if (!sanitizedName) {
            validationErrors.mealName = 'Meal name cannot be empty.';
        }
        if (!date) {
            validationErrors.date = 'A date must be selected.';
        }

        // Check if there are any errors
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onUpdate({
            ...meal,
            date,
            mealType,
            mealName: sanitizedName,
        });
    }

    return(
        <form className="flex flex-col gap-3 bg-base-100 p-4 rounded-box shadow-md max-w-xs mx-auto" onSubmit={handleSubmit}>
                        <h3 className="text-lg font-semibold mb-2">Edit Meal</h3>

                        {/* Date Input with Error Handling */}
                        <div>
                            <input
                                className={`input input-bordered w-full ${errors.date ? 'input-error' : ''}`}
                                type="date"
                                value={date}
                                onChange={(e) => {
                                    setDate(e.target.value);
                                    if (errors.date) setErrors(prev => ({...prev, date: null}));
                                }}
                                aria-invalid={!!errors.date}
                                aria-describedby={errors.date ? "edit-date-error" : undefined} 
                            />
                            {errors.date && <p id="edit-date-error" className="text-error text-sm mt-1">{errors.date}</p>}
                        </div>

                        <select
                            className="select select-bordered w-full"
                            value={mealType}
                            onChange={(e) => setMealType(e.target.value)}
                        >
                            <option>Breakfast</option>
                            <option>Lunch</option>
                            <option>Dinner</option>
                        </select>

                        {/* Meal Name Input with Error Handling */}
                        <div>
                            <input
                                className={`input input-bordered w-full ${errors.mealName ? 'input-error' : ''}`}
                                type="text"
                                placeholder="Meal Name"
                                value={mealName}
                                onChange={(e) => {
                                    setMealName(e.target.value);
                                    if (errors.mealName) setErrors(prev => ({...prev, mealName: null}));
                                }}
                                maxLength="30"
                                aria-invalid={!!errors.mealName}
                                aria-describedby={errors.mealName ? "edit-meal-name-error" : undefined}
                            />
                            <div className={`text-xs text-right mt-1 ${mealName.length >= 28 ? 'text-error' : 'text-base-content/50'}`}>
                                {mealName.length} / 30
                            </div>
                            {errors.mealName && <p id="edit-name-error" className="text-error text-sm mt-1">{errors.mealName}</p>}
                        </div>

                        <div className="flex gap-2 mt-2">
                            <button type="submit" className="btn btn-success">Update Meal</button>
                            <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>                    
                        </div>

        </form>
    );

}