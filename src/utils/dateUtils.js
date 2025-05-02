export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
       weekday: 'long',
       month: 'short',
       day: 'numeric', 
    });
}

export function getStartAndEndOfWeek(date) {
    // Get start of the week (Monday)
    const current = new Date(date);
    const day = current.getDay();
    const diff = (day === 0 ? -6 : 1 - day); // If Sunday (O), go back 6 days
    const startDate = new Date(current);
    startDate.setDate(current.getDate() + diff);
    startDate.setHours(0, 0, 0, 0); // Clear time to 00:00:00

    // Get end of the week (Sunday)
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // 6 days after Monday = Sunday
    endDate.setHours(23, 59, 59, 999); // Set to 23:59:59

    console.log("📆 getStartAndEndOfWeek called:");
    console.log("Input Date:", current);
    console.log("Calculated Start Date (Monday):", startDate);
    console.log("Calculated End Date (Sunday):", endDate);

    return { startDate, endDate };
}

export function toLocalDateKey(dateInput) {
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

console.log("✅ dateUtils.js loaded");