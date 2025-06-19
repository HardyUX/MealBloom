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

    return { startDate, endDate };
}

export function toLocalDateKey(dateInput) {
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

// Generate 7-day array starting from currentWeekStart
    export function generateWeekDays(startDate) {
        const start = new Date(startDate);
        const days = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(start);
            day.setDate(start.getDate() + i);
            days.push(day);
        }
        return days;
    }

export function formatWeekRange(startDate, endDate, { includeYear = true } = {}) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const sameMonth = start.getMonth() === end.getMonth();
    const sameYear = start.getFullYear() === end.getFullYear();

    const startDay = start.getDate();
    const endDay = end.getDate();
    const startMonth = start.toLocaleString('en-US', { month: 'short' });
    const endMonth = end.toLocaleString('en-US', { month: 'short' });

    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    if (sameMonth && sameYear) {
        return includeYear
        ? `${startMonth} ${startDay} - ${endDay}, ${startYear}`
        : `${startMonth} ${startDay} - ${endDay}`;
    } else if (sameYear) {
        return includeYear
        ? `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${startYear}`
        : `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
    } else {
        return includeYear
        ? `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`
        : `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}`;
    }
}

export function isToday(date) {
    if (!date) return false;
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}

export function isWeekend(date) {
    if (!date) return false;
    const day = date.getDay();
    // 0 = Sunday, 6 = Saturday
    return day === 0 || day === 6;
}

export function formatShortWeekday(date) {
    return date.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 2);
}

export function formatMonthDay(date) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}