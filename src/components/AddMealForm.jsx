// AddMealForm.jsx
import { useState } from 'react';

export default function AddMealForm({ dateString, onAdd, onCancel }) {
    const [mealType, setMealType] = useState('Breakfast');
    const [mealName, setMealName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onAdd({ mealType, mealName });
        setMealName('');
        setMealType('Breakfast');
    }

    return(
        <form onSubmit={(e) => handleSubmit(e, dateString)} className="flex flex-col gap-2 bg-base-100 p-4 rounded-box shadow-md max-w-xs mx-auto mt-1 sm:mt-2">
            <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="select select-bordered w-full"
            >
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
            </select>
            <input
                type="text"
                placeholder="Meal Name"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                className="input input-bordered w-full"
            />

            {/* Save and Cancel Button */}
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="btn btn-success"
                    title="Save"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                </button>
                <button
                    type="button"
                    className="btn btn-ghost"
                    title="Cancel"
                    onClick={onCancel}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </form>
    )
}