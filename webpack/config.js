// eslint-disable-next-line no-undef
const path = require("path");

// eslint-disable-next-line no-undef
module.exports = {
    entry: {
        content: "./src/js/content.ts",
        options: "./src/js/options.ts",
    },
    output: {
        filename: "./js/[name].js",
    },
    resolve: {
        // eslint-disable-next-line no-undef
        modules: [path.join(__dirname, "src"), "node_modules"],
        extensions: [".tsx", ".ts", ".js"],
    },
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
            },
        ],
    },
};
