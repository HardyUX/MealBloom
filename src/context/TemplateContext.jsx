import { createContext, useContext, useState, useEffect } from 'react';

const TemplateContext = createContext();

export function TemplateProvider({ children }) {
    // Load saved templates from localStorage
    const [templates, setTemplates] = useState(() => {
        const stored = localStorage.getItem('mealTemplates');
        return stored ? JSON.parse(stored) : [];
    });

    // Persist on changes
    useEffect(() => {
        localStorage.setItem('mealTemplates', JSON.stringify(templates));
    }, [templates]);

    // Create a new template
    const saveTemplate = (template) => {
        setTemplates((t) => [...t, template]);
    };

    // Delete a template by id
    const deleteTemplate = (id) => {
        setTemplates((t) => t.filter((tpl) => tpl.id !== id));
    };

    return (
        <TemplateContext.Provider value={{ templates, saveTemplate, deleteTemplate }}>
            {children}
        </TemplateContext.Provider>
    );
}

export function useTemplates() {
    const ctx = useContext(TemplateContext);
    if (!ctx) {
        throw new Error('useTemplates must be used within a TemplateProvider');
    }
    return ctx;
}