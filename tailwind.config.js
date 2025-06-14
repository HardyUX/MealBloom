/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                cozy: {
                    DEFAULT: '#faf3f0',    // primary bg
                    card:   '#F9F9F9',     // card/inner surface
                    accent: '#F5F5DC',     // accent, e.g. beige
                    blue: '#a8d8ea',     // buttons
                    dark: '#6bb7e3', // buttons on hover
                    yellow: '#FAFAD2',     // for positive or highlight
                    mint:   '#E0F2F1',     // secondary, e.g. selected or notification
                },
                
            },
            fontSize: {
                'lg' : '18px',
            },
            keyframes: {
                wiggleRight: {
                    '0%, 100%': { transform: 'translateX(0)'},
                    '50%': { transform: 'translateX(4px)' },
                },
                wiggleLeft: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '50%': { transform: 'translateX(-4px)' },
                },
            },
            animation: {
                'wiggle-right': 'wiggleRight 0.3s ease-in-out',
                'wiggle-left': 'wiggleLeft 0.3s ease-in-out',
            },
        },
    },
    plugins: [],
};