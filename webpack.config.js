const path = require('path');
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        expenses:'./js/expenses.js',
        budget: './js/budget.js',
        summary:'./js/summary.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '/'),
        },
        hot: true,
        open: true,
        port: 9000,
    },
};