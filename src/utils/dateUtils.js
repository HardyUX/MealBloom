export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
       weekday: 'long',
       month: 'short',
       day: 'numeric', 
    });
}

export function getStartAndEndOfWeek(date) {
    // Get start of the week (Sunday)
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = day === 0 ? -6 : 1 - day; // If Sunday (O), go back 6 days
    startDate.setDate(startDate.getDate() + diff); // Start of the week (Sunday)
    startDate.setHours(0, 0, 0, 0); // Clear time to 00:00:00

    // Get end of the week (Saturday)
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // End of week (Saturday)
    endDate.setHours(23, 59, 59, 999); // Set to 23:59:59

    return { startDate, endDate };
}

// export { formatDate, getStartAndEndOfWeek };