/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',

    devServer: {
        contentBase: './dist',
    },

    plugins: [
        // new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            title: 'Cyber Chess 2021',
            favicon: 'src/assets/Favicon.ico',
        }),
        new CopyPlugin({
            patterns: [
                {from: "./src/assets/stockfish", to: "./"}
            ]
        })
    ],

    module: {
        rules: [
            {
                test: /\.txt$/i,
                use: 'raw-loader',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.module\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'dts-css-modules-loader',
                        options: {
                            namedExport: true,
                            banner: '// This file is generated automatically',
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                    'sass-loader',
                ],
                include: /\.module\.scss$/,
            },

            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /\.module\.scss$/,
            },

            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /\.module\.css$/,
            },

            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
