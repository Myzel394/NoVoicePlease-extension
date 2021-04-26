const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        background: "./src/js/background.ts",
        content: "./src/js/content.ts",
        options: "./src/js/options.ts",
    },
    output: {
        filename: "./js/[name].js",
    },
    resolve: {
        modules: [path.join(__dirname, "src"), "node_modules"],
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, "../src"),
                globOptions: {
                    ignore: [
                        "**/*.ts",
                        "**/manifest.json",
                        "**/icons",
                    ],
                },
            }],
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: "node_modules/webextension-polyfill/dist/browser-polyfill.js",
            }],
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, "../src/assets/icons"),
            }],
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: "node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js",
            }],
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: "node_modules/materialize-css/dist/css/materialize.min.css",
                to: path.resolve(__dirname, "../build/prod/assets/css/materialize.min.css"),
            }],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                use: "svg-inline-loader",
                exclude: /node_modules/,
            },
        ],
    },
};
