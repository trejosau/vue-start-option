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
                // Definimos la paleta Nord Dark como valores de color "principales".
                bg:         '#2E3440', // gris azulado oscuro (fondo principal)
                fg:         '#D8DEE9', // texto claro
                ice:        '#88C0D0', // azul hielo
                teal:       '#8FBCBB', // turquesa suave
                blush:      '#BF616A', // rosa suave
                butter:     '#EBCB8B', // amarillo pastel
                grayDark:   '#3B4252', // gris medio
                grayMedium: '#4C566A', // gris claro
                grayLight:  '#ECEFF4', // gris muy claro
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
