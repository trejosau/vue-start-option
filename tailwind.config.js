const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {

    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                bg:         '#2E3440',
                fg:         '#D8DEE9',
                ice:        '#88C0D0',
                teal:       '#8FBCBB',
                blush:      '#BF616A',
                butter:     '#EBCB8B',
                grayDark:   '#3B4252',
                grayMedium: '#4C566A',
                grayLight:  '#ECEFF4',
            },
        },
    },

    variants: {
        extend: {
            // Podemos eliminar variantes de `dark:…` porque siempre será Nord Dark
        },
    },

    plugins: [
        require('@tailwindcss/forms'),
    ],
};
