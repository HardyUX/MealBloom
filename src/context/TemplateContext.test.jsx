//src/context/TemplateContext.test.jsx
import { useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import { TemplateProvider, useTemplates } from './TemplateContext';

function TestConsumer({ onReady }) {
    const { templates, saveTemplate } = useTemplates();

    // Trigger saveTemplate once on mount
    useEffect(() => {
        // Kick off the action under test
        saveTemplate({ id: 't1', name: 'Pasta', mealType: 'Dinner'});
    }, []);

    // Notify when templates change
    useEffect(() => {
        if (templates.length > 0) {
            onReady(templates);
        }
    }, [templates]);

    return <div data-testid="count">{templates.length}</div>;
}

function DeleteTestConsumer({ onReady }) {
    const { templates, saveTemplate, deleteTemplate } = useTemplates();

    // On mount: add then remove the template
    useEffect(() => {
        saveTemplate({ id: 't1', name: 'Pasta', mealType: 'Dinner' });
        deleteTemplate('t1');
    }, []);

    // Notify when templates change
    useEffect(() => {
        // Fire as soon as context state updates
        onReady(templates);   
    }, [templates]);

    return <div data-testid="count">{templates.length}</div>;
}

describe('TemplateContext', () => {
    beforeEach(() => {
        // Clear localStorage between tests
        localStorage.clear();
        jest.clearAllMocks();
    });

    it('saveTemplate adds a new template to state and to localStorage', async () => {
        let seenTemplates;

        render(
            <TemplateProvider>
                <TestConsumer onReady={(tpls) => { seenTemplates = tpls; }} />
            </TemplateProvider>
        );

        // The TestConsumer writes out the count, so we can assert it
        const countDiv = await screen.findByTestId('count');
        expect(countDiv).toHaveTextContent('1');

        // Also verify our hook saw the new template
        expect(seenTemplates).toEqual([
            { id: 't1', name: 'Pasta', mealType: 'Dinner' }
        ]);

        // And localStorage was updated
        const stored = JSON.parse(localStorage.getItem('mealTemplates'));
        expect(stored).toEqual(seenTemplates);
    });

    it('deleteTemplate removes a template from state and localStorage', async () => {
        let seenTemplates;

        render(
            <TemplateProvider>
                <DeleteTestConsumer onReady={(tpls) => { seenTemplates = tpls; }} />
            </TemplateProvider>
        );

        const countDiv = await screen.findByTestId('count');
        expect(countDiv).toHaveTextContent('0');
        expect(seenTemplates).toEqual([]);

        const stored = JSON.parse(localStorage.getItem('mealTemplates'));
        expect(stored).toEqual([]);
    });
});