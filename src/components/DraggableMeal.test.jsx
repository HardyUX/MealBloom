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
        saveTemplate: mockSaveTemplate
    })
}));

describe('DraggableMeal', () => {
    const meal = { id: 'm1', mealName: 'Spaghetti', mealType: 'Dinner' };
    const noop = () => {};

    beforeAll(() => {
        // Freeze Date.now for deterministic ID
        jest.spyOn(Date, 'now').mockReturnValue(123456);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('calls saveTemplate with the correct payload when ⭐ is clicked', () => {
        const { getByTitle } = render(
            <DraggableMeal meal={meal} onEdit={noop} onDelete={noop} />
        );

        const btn = getByTitle('Save as template');
        fireEvent.click(btn);

        expect(mockSaveTemplate).toHaveBeenCalledWith({
            id: 'template-123456',
            name: 'Spaghetti',
            mealType: 'Dinner'
        });
    });
});