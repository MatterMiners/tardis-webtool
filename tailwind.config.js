module.exports = {
    content: ['./src/**/*.{vue,ts}'],
    theme: {
        extend: {
            colors: {
                tardis: '#000097',
            },
        },
    },
    safelist: ['greenbtn', 'bluebtn', 'redbtn', 'yellowbtn'],
    plugins: [require('@tailwindcss/forms')],
};
