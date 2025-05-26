// src/components/Header.jsx
import logoSrc from '../assets/MealBloom_Logo-transparent.png';
import { useCalendar } from '../context/CalendarContext';
import { formatWeekRange } from '../utils/dateUtils';
import DropTargetButton from './DropTargetButton';
import { useMeals } from '../context/MealContext';

export default function Header() {
    const {
        viewMode,
        setViewMode,
        goPrevious,
        goNext,
        startDate,
        endDate,
        anchorDate: calendarAnchorDate
    } = useCalendar();
    const { moveMeal } = useMeals()

    return (
        <header className="bg-gray-100 py-2 shadow">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center gap-10">
            <img
                src={logoSrc}
                alt="MealBloom Logo"
                className="w-24 h-24 flex-shrink-0"
            />

            {/* =================== Week Header & Navigation =================== */}
            <h2 className="text-2xl font-bold mb-4">Scheduled Meals</h2>

            <div className="flex gap-2 mb-6">
                <button
                    className={`px-4 py-2 rounded ${viewMode === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    onClick={() => setViewMode('week')}
                >
                    Week
                </button>
                <button
                    className={`px-4 py-2 rounded ${viewMode === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    onClick={() => setViewMode('month')}
                >
                    Month
                </button>
            </div>

            {/* Navigation between weeks */}
            <div className="flex items-center justify-between mb-6 gap-4">
                {viewMode === 'week' ? (
                    <>
                        <DropTargetButton
                            title="Previous"
                            direction="previous"
                            onClick={goPrevious}
                            onDropMeal={(meal, fromKey, toKey) => {
                                moveMeal(meal, fromKey, toKey)
                                goPrevious()
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                            </svg>
                        </DropTargetButton>

                        {/* Mobile version (short) */}
                        <h3 className="text-xl font-semibold block sm:hidden">
                            {formatWeekRange(startDate, endDate, { includeYear: false })}
                        </h3>

                        {/* Desktop version (full) */}
                        <h3 className="text-xl font-semibold hidden sm:block">
                            {formatWeekRange(startDate, endDate, { includeYear: true })}
                        </h3>
                        
                        <DropTargetButton
                            title="Next"
                            direction="next"
                            onClick={goNext}
                            onDropMeal={(meal, fromKey, toKey) => {
                                moveMeal(meal, fromKey, toKey)
                                goNext()
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                        </DropTargetButton>
                    </>
                ) : (
                    <>
                        <button
                            title="Previous"
                            onClick={goPrevious}
                            className="px-4 py-2 bg-gray-200 hover: bg-gray-300 rounded"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                            </svg>
                        </button>

                        
                        <h3 className="text-xl font-semibold">
                            {calendarAnchorDate.toLocaleString('en-US', { month: 'long', year: 'numeric'})}
                        </h3>

                        <button
                            title="Next"
                            onClick={goNext}
                            className="px-4 py-2 bg-gray-200 hover: bg-gray-300 rounded"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                        </button>
                    </>
                )}
            </div>

        </div>
    </header>
        
    );
}