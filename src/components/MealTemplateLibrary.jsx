// MealTemplateLibrary.jsx
import { useTemplates } from '../context/TemplateContext';
import { Trash2, Play } from 'lucide-react'; // Icons for delete and use

function MealTemplateLibrary({ onUseTemplate }) {
    // Pull templates (and any CRUD actions) straight from context
    const { templates, deleteTemplate } = useTemplates();

    const handleUse = (template) => {
        onUseTemplate(template);
    };

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

                            {/* Actions: Use and Delete */}
                            <div className="flex items-center gap-2">
                                {/* Delete icon button */}
                                <button
                                    className="delete-template p-1 rounded hover:bg-red-100"
                                    aria-label={`Delete template ${template.name}`}
                                    onClick={() => deleteTemplate(template.id)}
                                >
                                    <Trash2 size={16} className="text-red-600 hover:text-red-800" />
                                </button>

                            </div>

                            {/* Use button */}
                            <button
                                className="text-blue-600 hover:text-blue-800 text-sm"
                                onClick={() => handleUse(template)}
                            >
                                <Play size={14} className="mr-1" /> Use
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MealTemplateLibrary;