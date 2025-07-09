// src/components/Header.jsx
import logoSrc from '../assets/MealBloom_Logo-transparent.png';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    const [main, year] = formatWeekRange(startDate, endDate, { includeYear: true }).split(', ')

    return (
        <header className="navbar bg-cozy mb-4 px-2 sm: px-6">
            {/* Logo and App Title */}
            <div className="navbar-start flex items-center gap-2 px-2">
                <img
                    src={logoSrc}
                    alt="MealBloom Logo"
                    className="w-20 h-20 sm:w-20 h-20"
                />
                <h1 className="text-4xl ml-2 font-logo">MealBloom</h1>
            </div>

            {/* Center: Navigation and Date Range */}
            <div className="navbar-center flex flex-col items-center gap-2">
                {/* View Mode Toggle */}
                <div className="join mb-1">
                    <button
                        className={`btn btn-sm join-item ${viewMode === 'week' 
                            ? 'bg-cozy-blue text-gray-900 hover:bg-cozy-dark'
                            : 'bg-white text-gray-600 border border-cozy-accent hover:bg-cozy-blue/20'}`}
                        onClick={() => setViewMode('week')}
                        aria-current={viewMode === 'week' ? 'page' : undefined}
                    >
                        Week
                    </button>
                    <button
                        className={`btn btn-sm join-item ${viewMode === 'month' 
                            ? 'bg-cozy-blue text-gray-900 hover:bg-cozy-dark'
                            : 'bg-white text-gray-600 border border-cozy-accent hover:bg-cozy-blue/20'}`}
                        onClick={() => setViewMode('month')}
                        aria-current={viewMode === 'month' ? 'page' : undefined}
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
                            className="btn btn-sm"
                            aria-label={`Go to previous ${viewMode}`}
                        >
                            <ChevronLeft size={20} />
                        </DropTargetButton>

                        <h2 className="text-xl font-semibold mx-4 text-center leading-tight">
                            <span className="hidden sm:inline">
                                {main}
                                <br />
                                <span className="text-xs font-light text-base-content/60">{year}</span>
                            </span>
                            <span className="sm:hidden">{formatWeekRange(startDate, endDate, { includeYear: false })}</span>
                        </h2>
                        
                        <DropTargetButton
                            title="Next"
                            direction="next"
                            onClick={goNext}
                            onDropMeal={(meal, fromKey, toKey) => {
                                moveMeal(meal, fromKey, toKey)
                                goNext()
                            }}
                            className="btn btn-sm"
                            aria-label={`Go to next ${viewMode}`}
                        >
                            <ChevronRight size={20} />
                        </DropTargetButton>
                    </>
                ) : (
                    <>
                        <button
                            title="Previous"
                            onClick={goPrevious}
                            className="btn btn-sm bg-gray-200 hover:bg-gray-300"
                            aria-label={`Go to previous ${viewMode}`}
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <h3 className="text-xl font-semibold mx-4 text-center leading-tight">
                            <span>{calendarAnchorDate.toLocaleString('en-US', { month: 'long' })}</span>
                            <br />
                            <span className="text-xs font-light text-base-content/60">{calendarAnchorDate.getFullYear()}</span>
                        </h3>

                        <button
                            title="Next"
                            onClick={goNext}
                            className="btn btn-sm bg-gray-200 hover:bg-gray-300"
                            aria-label={`Go to next ${viewMode}`}
                        >
                            <ChevronRight size={20} />
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