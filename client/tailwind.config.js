/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                pink: '#D975BB',
                purple: '#BABCDB',
                softPurple: '#EBECF5',
                darkPurple: '#261863',
                purpleBlack: '#171532',
            },
        },
    },
    plugins: [],
}

