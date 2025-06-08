// src/components/DraggableMeal.jsx
import { useState } from 'react';
import { useMealDrag } from '../hooks/useMealDrag';
import { useTemplates } from '../context/TemplateContext';
import FavoriteButton from './FavoriteButton';
import KebabMenu from './KebabMenu';

// Reusable components
function DraggableMeal({ meal, onEdit, onDelete}) {
    const { templates, saveTemplate, deleteTemplate } = useTemplates();
    const [{ isDragging }, drag] = useMealDrag({ ...meal, fromDate: meal.date });

    // Favorite status logic: checks if this meal exists in templates
    const isFavorited = templates.some(
        (t) => t.mealName === meal.mealName && t.mealType === meal.mealType
    );

    function handleToggleFavorite() {
        if (!isFavorited) {
            saveTemplate({
                id: `template-${Date.now()}`,
                name: meal.mealName,
                mealType: meal.mealType,
            });
        } else {
            const template = templates.find(
                (t) => t.mealName === meal.mealName && t.mealType === meal.mealType
            );
            if (template) deleteTemplate(template.id);
        }
    }

    return (
        <li
            ref={drag}
            style={{ opacity: isDragging ? 0.5 : 1}}
            className="
                relative
                bg-base-100
                rounded-box
                border border-base-200
                p-3 mb-2
                min-w-0 w-full
                shadow transition-opacity group"
            tabIndex={0}
        >
            {/* Kebab menu for edit/delete */}
            <KebabMenu
                onEdit={() => onEdit(meal)}
                onDelete={() => onDelete(meal.id, meal.date)}
            />

            {/* Favorite/Save as Template heart icon */}
            <FavoriteButton
                isFavorited={isFavorited}
                onToggle={handleToggleFavorite}
                ariaLabel={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            />

            {/* Main meal info */}
            <div className="flex items-start gap-3">
                <span className="text-xl" aria-hidden="true">
                    {meal.mealType === 'Breakfast' ? '🥐' : meal.mealType === 'Lunch' ? '🥪' : '🍝'}
                </span>
                <div className="flex flex-col leading-tight">
                    <span className="text-xs text-base-content/60">{meal.mealType}</span>
                    <span className="text-base font-semibold">{meal.mealName}</span>
                </div>
            </div>
        </li>
    );
}

export default DraggableMeal;