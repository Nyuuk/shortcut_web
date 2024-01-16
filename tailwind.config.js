import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
        "node_modules/flowbite-react/lib/esm/**/*.js",
        "node_modules/tailwind-datepicker-react/dist/**/*.js",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            screens: {
                tiny: "500px",
            },
        },
    },

    plugins: [forms, require("flowbite/plugin")],

    config: {
        darkMode: "class",
        theme: {
            extend: {
                colors: {
                    primary: {
                        50: "#ecfeff",
                        100: "#cffafe",
                        200: "#a5f3fc",
                        300: "#67e8f9",
                        400: "#22d3ee",
                        500: "#06b6d4",
                        600: "#0891b2",
                        700: "#0e7490",
                        800: "#155e75",
                        900: "#164e63",
                        950: "#083344",
                    },
                },
            },
            fontFamily: {
                body: [
                    "Nunito Sans",
                    "ui-sans-serif",
                    "system-ui",
                    "-apple-system",
                    "system-ui",
                    "Segoe UI",
                    "Roboto",
                    "Helvetica Neue",
                    "Arial",
                    "Noto Sans",
                    "sans-serif",
                    "Apple Color Emoji",
                    "Segoe UI Emoji",
                    "Segoe UI Symbol",
                    "Noto Color Emoji",
                ],
                sans: [
                    "Nunito Sans",
                    "ui-sans-serif",
                    "system-ui",
                    "-apple-system",
                    "system-ui",
                    "Segoe UI",
                    "Roboto",
                    "Helvetica Neue",
                    "Arial",
                    "Noto Sans",
                    "sans-serif",
                    "Apple Color Emoji",
                    "Segoe UI Emoji",
                    "Segoe UI Symbol",
                    "Noto Color Emoji",
                ],
            },
        },
    },
};
