// AddMealForm.jsx
import { useState } from 'react';
import DOMPurify from 'dompurify';

export default function AddMealForm({ dateString, onAdd, onCancel }) {
    const [mealType, setMealType] = useState('Breakfast');
    const [mealName, setMealName] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        // Sanitize and validate input
        const sanitizedName = DOMPurify.sanitize(mealName.trim());

        if (!sanitizedName) {
            setError('Meal name cannot be empty.');
            return;
        }

        onAdd({ mealType, mealName: sanitizedName });

        setMealName('');
        setMealType('Breakfast');
        setError('');
    }

    return(
        <form onSubmit={(e) => handleSubmit(e, dateString)} className="flex flex-col gap-2 bg-base-100 p-4 rounded-box shadow-md max-w-xs mx-auto mt-1 sm:mt-2">
            {/* Accessible label for meal type */}
            <label htmlFor="meal-type-select" className="sr-only">Meal Type</label>
            <select
                id="meal-type-select"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="select select-bordered w-full"
                aria-label="Meal Type"
            >
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
            </select>

            {/* Input and Error Message */}
            <div>
                <label htmlFor="meal-name-input" className="sr-only">Meal Name</label>
                <input
                    id="meal-name-input"
                    type="text"
                    placeholder="Meal Name"
                    value={mealName}
                    onChange={(e) => {
                        setMealName(e.target.value);
                        if (error) {
                            setError('');
                        }
                    }}
                    maxLength="30"

                    className={`input input-bordered w-full ${error ? 'input-error': ''}`}
                    aria-invalid={!!error}
                    aria-describedby={error ? "meal-name-error" : undefined}
                    aria-label="Meal Name"
                />
                <div className={`text-xs text-right mt-1 ${mealName.length >= 28 ? 'text-error' : 'text-base-content/50'}`}>
                    {mealName.length} / 30
                </div>
                {error && <p id="meal-name-error" className="text-error text-sm mt-1">{error}</p>}
            </div>

            {/* Save and Cancel Button */}
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="btn btn-success"
                    title="Save"
                    aria-label="Save Meal"
                    disabled={!mealName.trim()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                </button>
                <button
                    type="button"
                    className="btn btn-ghost"
                    title="Cancel"
                    aria-label="Cancel"
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