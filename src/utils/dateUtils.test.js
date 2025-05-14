import { toLocalDateKey } from './dateUtils';

describe('formatDate', () => {
    it('formats a Date object as YYYY-MM-DD', () => {
        const d = new Date(2025, 0, 5); // Jan 5, 2025
        expect(toLocalDateKey(d)).toBe('2025-01-05');
    });
});