import { useState } from 'react';
import AddMealForm from './AddMealForm';
import MealTemplateLibrary from './MealTemplateLibrary';

export default function AddCreateMealModal({ dateString, isOpen, onClose, onAddMeal }) {
    const [step, setStep] = useState('choose'); // 'choose' | 'add' | 'template'

    // Reset step when modal opens/closes
    // (Optional: You can use an effect to auto-reset on open)
    if (!isOpen && step !== 'choose') setStep('choose');

    return isOpen ? (
        <dialog id="add-create-modal" className="modal modal-open">
            <div className="modal-box max-w-md">
                <form method="dialog">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={onClose}
                        aria-label="Close"
                        type="button"
                    >✕</button>
                </form>
                {step === 'choose' && (
                    <div className="flex flex-col items-center gap-4">
                        <h2 className="text-lg font-bold mb-2">Add a Meal</h2>
                        <button
                            className="btn btn-primary btn-lg w-full flex items-center gap-2"
                            onClick={() => setStep('add')}
                            aria-label="Add a blank meal"
                        >
                            <span className="text-xl">+</span>
                            <span>Add Blank Meal</span>
                        </button>
                        <button
                            className="btn btn-outline btn-lg w-full flex items-center gap-2"
                            onClick={() => setStep('template')}
                            aria-label="Add meal from template"
                        >
                            <span className="text-xl">🗂️</span>
                            <span>Use Template</span>
                        </button>
                    </div>
                )}

                {step === 'add' && (
                    <AddMealForm
                        dateString={dateString}
                        onAdd={({ mealType, mealName }) => {
                            onAddMeal({
                                id: Date.now(),
                                date: dateString,
                                mealType,
                                mealName,
                            });
                            onClose();
                            setStep('choose');
                        }}
                        onCancel={() => setStep('choose')}
                    />
                )}

                {step === 'template' && (
                    <MealTemplateLibrary
                        onUseTemplate={(template) => {
                            onAddMeal({
                                id: Date.now(),
                                date: dateString,
                                mealType: template.mealType,
                                mealName: template.name,
                            });
                            onClose();
                            setStep('choose');
                        }}
                    />
                )}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    ) : null;
}