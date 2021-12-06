const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { webpack, DefinePlugin } = require("webpack");
require('dotenv').config({ path: '.env' });

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: { 
        path: path.join(__dirname, "dist"), 
        filename: "index.bundle.js", 
        publicPath: '/'
    },
    mode: process.env.NODE_ENV || "development",
    resolve: { modules: [path.resolve(__dirname, "src"), "node_modules"] },
    devServer: { 
        static: path.join(__dirname, "src"),
        historyApiFallback: true 
    },
    module: {
        rules: [
            { 
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/, 
                use: ["babel-loader"] 
            },
            {
                test: /\.css$/,
                // exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            { 
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"] 
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
        new DefinePlugin({
            "process.env.REACT_APP_GOOGLE_MAPS_API_KEY": JSON.stringify(process.env.REACT_APP_GOOGLE_MAPS_API_KEY),
            "process.env.REACT_APP_MAPBOX_API_KEY": JSON.stringify(process.env.REACT_APP_MAPBOX_API_KEY),
        }),
    ],
};

