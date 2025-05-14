// src/components/MealTemplateLibrary.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import MealTemplateLibrary from './MealTemplateLibrary';
import { TemplateProvider } from '../context/TemplateContext';

describe('MealTemplateLibrary', () => {
    const templatesKey = 'mealTemplates';

    beforeEach(() => {
        // Seed localStorage with two templates
        const initial = [
            { id: 't1', name: 'Pasta', mealType: 'Dinner' },
            { id: 't2', name: 'Omelette', mealType: 'Breakfast'},
        ];
        localStorage.setItem(templatesKey, JSON.stringify(initial));
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('renders saved templates and allows deletion', () => {
        render(
            <TemplateProvider>
                <MealTemplateLibrary />
            </TemplateProvider>
        );

        // Both templates should appear by name
        expect(screen.getByText('Pasta')).toBeInTheDocument();
        expect(screen.getByText('Omelette')).toBeInTheDocument();

        // Find and click the delete button next to "Pasta"
        const pastaDeleteBtn = screen
            .getByText('Pasta')
            .closest('li')
            .querySelector('button.delete-template');
        fireEvent.click(pastaDeleteBtn);

        // "Pasta" should be gone, but "Omelette" remains
        expect(screen.queryByText('Pasta')).not.toBeInTheDocument();
        expect(screen.getByText('Omelette')).toBeInTheDocument();

        // localStorage should only contain the remaining template
        const stored = JSON.parse(localStorage.getItem(templatesKey));
        expect(stored).toEqual([
            { id: 't2', name: 'Omelette', mealType: 'Breakfast' },
        ]);
    });
});