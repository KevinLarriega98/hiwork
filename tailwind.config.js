/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}",
        "./src/**/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#FFF",
                gray_1: "#E6E6E6",
                gray_2: "#808080",
                gray_3: "#666",
                gray_4: "#A6A6A6",
                gray_5: "#D9D9D9",
                text_black: "#000000",
                verde_claro: "#D7FF3C",
                verde_oscuro: "#004932",
                lila_oscuro: "#7F35E9",
                rosa: "#FFB2E2",
                naranja_oscuro: "#FFAA00",
                naranja_claro: "#FFC729",

                cta_primary: "#FFB2E2",
                cta_secondary: "#7F35E9",
            },
        },
    },
    plugins: [],
};
