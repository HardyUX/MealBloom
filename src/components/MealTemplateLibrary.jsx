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
        <div className="card bg-base-100 shadow-md max-w-sm">
            <div className="card-body">
                {/* Header */}
                <h2 className="card-title text-lg mb-2">Meal Templates</h2>

                {/* If no templates saved yet */}
                {templates.length === 0 ? (
                    <p className="text-base-content/60 text-sm">No templates saved yet.</p>
                ) : (
                    // Render template list
                    <ul className="flex flex-col gap-2">
                        {templates.map((template) => (
                            <li key={template.id} className="flex justify-between items-center">
                                <div>
                                    {/* Template name and meal type (e.g., Lunch) */}
                                    <span className="font-medium">{template.name}</span>
                                    <span className="text-sm text-base-content/60 ml-2">({template.mealType})</span>
                                </div>

                                {/* Actions: Use and Delete */}
                                <div className="flex gap-1">
                                    {/* Delete icon button */}
                                    <button
                                        className="btn btn-error btn-xs"
                                        aria-label={`Delete template ${template.name}`}
                                        onClick={() => deleteTemplate(template.id)}
                                    >
                                        <Trash2 size={16} className="text-red-600 hover:text-red-800" />
                                    </button>

                                </div>

                                {/* Use button */}
                                <button
                                    className="btn btn-outline btn-xs"
                                    onClick={() => handleUse(template)}
                                >
                                    <Play size={14} className="mr-1" /> Use
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default MealTemplateLibrary;