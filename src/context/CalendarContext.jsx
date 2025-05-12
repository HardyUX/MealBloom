import React, { createContext, useContext, useState, useMemo } from 'react';
import { getStartAndEndOfWeek, toLocalDateKey } from '../utils/dateUtils';

// Create context
const CalendarContext = createContext();

// Provider component
export function CalendarProvider({ children }) {
    // Anchor date for both week & month views
    const [anchorDate, setAnchorDate] = useState(() => {
        const today = new Date();
        return getStartAndEndOfWeek(today).startDate;
    });

    // View mode: 'week' or 'month'
    const [viewMode, setViewMode] = useState('week');

    // Computed week range
    const { startDate, endDate } = useMemo(
        () => getStartAndEndOfWeek(toLocalDateKey(anchorDate)),
        [anchorDate]
    );

    // Navigation helpers
    const goPrevious = () => {
        if (viewMode === 'week') {
            const prev = new Date(anchorDate);
            prev.setDate(prev.getDate() - 7);
            setAnchorDate(getStartAndEndOfWeek(prev).startDate);
        } else {
            const prev = new Date(anchorDate);
            prev.setMonth(prev.getMonth() - 1);
            setAnchorDate(prev);
        }
    };

    const goNext = () => {
        if (viewMode === 'week') {
            const next = new Date(anchorDate);
            next.setDate(next.getDate() + 7);
            setAnchorDate(getStartAndEndOfWeek(next).startDate);
        } else {
            const next = new Date(anchorDate);
            next.setMonth(next.getMonth() + 1);
            setAnchorDate(next);
        }
    };

    // Expose context value
    const value = {
        anchorDate,
        startDate,
        endDate,
        viewMode,
        setViewMode,
        goPrevious,
        goNext
    };

    return (
        <CalendarContext.Provider value={value}>
            {children}
        </CalendarContext.Provider>
    );
}

// Hook to consume
export function useCalendar() {
    const ctx = useContext(CalendarContext);
    if (!ctx) {
        throw new Error('useCalendar must be used within a CalendarProvider');
    }
    return ctx;
}