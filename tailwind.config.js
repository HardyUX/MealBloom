/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
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