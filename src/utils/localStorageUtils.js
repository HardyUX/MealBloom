// Load meals from localStorage when component mounts
export const loadMeals = () => {
    const storedMeals = localStorage.getItem('meals');
    return storedMeals ? JSON.parse(storedMeals) : [];
}

// Function to save meals to localStorage
export const saveMeals = (meals) => {
    localStorage.setItem('meals', JSON.stringify(meals));
}