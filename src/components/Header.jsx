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
        <header className="navbar bg-cozy mb-4 px-2 sm: px-6">
            {/* Logo and App Title */}
            <div className="navbar-start flex items-center gap-2">
                <img
                    src={logoSrc}
                    alt="MealBloom Logo"
                    className="w-20 h-20 sm:w-20 h-20"
                />
                <h1 className="text-2xl font-bold ml-2">MealBloom</h1>
            </div>

            {/* Center: Navigation and Date Range */}
            <div className="navbar-center flex flex-col items-center gap-1">
                {/* View Mode Toggle */}
                <div className="join mb-1">
                    <button
                        className={`btn btn-sm join-item ${viewMode === 'week' 
                            ? 'bg-cozy-blue text-gray-900 hover:bg-cozy-dark'
                            : 'bg-white text-gray-600 border border-cozy-accent hover:bg-cozy-blue/20'}`}
                        onClick={() => setViewMode('week')}
                    >
                        Week
                    </button>
                    <button
                        className={`btn btn-sm join-item ${viewMode === 'month' 
                            ? 'bg-cozy-blue text-gray-900 hover:bg-cozy-dark'
                            : 'bg-white text-gray-600 border border-cozy-accent hover:bg-cozy-blue/20'}`}
                        onClick={() => setViewMode('month')}
                    >
                        Month
                    </button>
            </div>

            {/* Date Range or Month Display */}
            <div className="flex items-center gap-2">
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

                        <h3 className="text-xl font-semibold mx-2">
                            <span className="hidden sm:inline">{formatWeekRange(startDate, endDate, { includeYear: true })}</span>
                            <span className="sm:hidden">{formatWeekRange(startDate, endDate, { includeYear: false })}</span>
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
                            className="btn btn-sm btn-outline"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                            </svg>
                        </button>

                        
                        <h3 className="text-xl font-semibold mx-2">
                            {calendarAnchorDate.toLocaleString('en-US', { month: 'long', year: 'numeric'})}
                        </h3>

                        <button
                            title="Next"
                            onClick={goNext}
                            className="btn btn-sm btn-outline"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                        </button>
                    </>
                )}
            </div>
        </div>

        {/* Placeholder for navbar-end (future actions/user menu) */}
        <div className="navbar-end"></div>
    </header>
        
    );
}