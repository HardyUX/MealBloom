// MealTemplateLibrary.jsx
import { loadMealTemplates } from "../utils/localStorageUtils";

function MealTemplateLibrary({ onUseTemplate }) {
    // Load template data from localStorage
    const templates = loadMealTemplates();

    return (
        <div className="border rounded shadow bg-white p-4 max-w-sm">
            {/* Header */}
            <h3 className="text-lg font-semibold mb-4">Meal Templates</h3>

            {/* If no templates saved yet */}
            {templates.length === 0 ? (
                <p className="text-gray-500 text-sm">No templates saved yet.</p>
            ) : (
                // Render template list
                <ul className="space-y-2">
                    {templates.map((template) => (
                        <li key={template.id} className="flex justify-between items-center">
                            <div>
                                {/* Template name and meal type (e.g., Lunch) */}
                                <span className="font-medium">{template.name}</span>
                                <span className="text-sm text-gray-500 ml-2">({template.mealType})</span>
                            </div>

                            {/* Call parent callback when user clicks "Use" */}
                            <button
                                className="text-blue-600 hover:text-blue-800 text-sm"
                                onClick={() => onUseTemplate(template)}
                            >
                                Use
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MealTemplateLibrary;