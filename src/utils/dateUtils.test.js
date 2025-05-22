import { toLocalDateKey, isToday, isWeekend } from './dateUtils';

describe('formatDate', () => {
    it('formats a Date object as YYYY-MM-DD', () => {
        const d = new Date(2025, 0, 5); // Jan 5, 2025
        expect(toLocalDateKey(d)).toBe('2025-01-05');
    });
});

describe('dateUtils', () => {
    describe('isToday', () => {
        it('returns true for today', () => {
            const now = new Date();
            expect(isToday(now)).toBe(true);
            expect(isToday(new Date(now.toISOString()))).toBe(true);
        });

        it('returns false for yesterday and tomorrow', () => {
            const now = new Date();
            const yesterday = new Date(now);
            yesterday.setDate(now.getDate() -1);
            const tomorrow = new Date(now);
            tomorrow.setDate(now.getDate() +1);
            expect(isToday(yesterday)).toBe(false);
            expect(isToday(tomorrow)).toBe(false);
        });

        it('returns false for invalid or undefined input', () => {
            expect(isToday(null)).toBe(false);
            expect(isToday(undefined)).toBe(false);
            expect(isToday('')).toBe(false);
        });
    });

    describe('isWeekend', () => {
        it('returns true for Saturday and Sunday', () => {
            const saturday = new Date('2025-06-14'); // Saturday
            const sunday = new Date('2025-06-15'); // Sunday
            expect(isWeekend(saturday)).toBe(true);
            expect(isWeekend(sunday)).toBe(true);
        });

        it('returns false for Monday to Friday', () => {
            const monday = new Date('2025-06-16');
            expect(isWeekend(monday)).toBe(false);
        });

        it('returns false for invalid or undefined input', () => {
            expect(isWeekend(null)).toBe(false);
            expect(isWeekend(undefined)).toBe(false);
            expect(isWeekend('')).toBe(false);
        });
    });
});