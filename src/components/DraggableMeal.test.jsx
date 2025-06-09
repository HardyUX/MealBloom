// src/components/DraggableMeal.test.jsx
import { render, fireEvent } from '@testing-library/react';
import DraggableMeal from './DraggableMeal';

// Mock the DnD hook so it doesn't interfere with this test
jest.mock('react-dnd', () => ({
    useDrag: () => [{ isDragging: false }, jest.fn()],
}));

// Mock the TemplateContext
const mockSaveTemplate = jest.fn();
jest.mock('../context/TemplateContext', () => ({
    useTemplates: () => ({
        templates: [],
        saveTemplate: mockSaveTemplate,
        deleteTemplate: jest.fn(),
    })
}));

describe('DraggableMeal', () => {
    const meal = { id: 'm1', mealName: 'Spaghetti', mealType: 'Dinner' };
    const noop = () => {};

    it('calls saveTemplate with the correct payload when heart icon is clicked', () => {
        const { getByLabelText } = render(
            <DraggableMeal meal={meal} onEdit={noop} onDelete={noop} />
        );

        const btn = getByLabelText('Add to favorites');
        fireEvent.click(btn);

        expect(mockSaveTemplate).toHaveBeenCalledWith({
            id: 'template-Dinner-Spaghetti',
            name: 'Spaghetti',
            mealType: 'Dinner'
        });
    });
});