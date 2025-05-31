/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                pastelPink: '#FFF4FC',
                purple: '#EAACFF',
                green: '#8EFF88',
                red: '#F96956',
                pastelRed: '#FF6C6C',
                pastelYellow: '#FFFA77',
                gray: '#D9D9D9',
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