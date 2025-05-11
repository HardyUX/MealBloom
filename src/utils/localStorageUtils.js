// Load meals from localStorage when component mounts
export const loadMeals = () => {
    const storedMeals = localStorage.getItem('meals');
    return storedMeals ? JSON.parse(storedMeals) : [];
}

// Function to save meals to localStorage
export const saveMeals = (meals) => {
    localStorage.setItem('meals', JSON.stringify(meals));
}

// Load and save meal template
export function loadMealTemplates() {
    return JSON.parse(localStorage.getItem('mealTemplates')) || [];
}

export function saveMealTemplate(meal) {
    const templates = loadMealTemplates();
    const newTemplate = {
        id: `template-${Date.now()}`,
        name: meal.mealName,
        mealType: meal.mealType,
    };
    const updated = [...templates, newTemplate];
    localStorage.setItem('mealTemplates', JSON.stringify(updated));
    return newTemplate;
}