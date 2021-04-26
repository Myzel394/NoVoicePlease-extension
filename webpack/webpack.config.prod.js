const path = require("path");

const _ = require("lodash");
const WebExtPlugin = require("web-ext-plugin");
const VersionFilePlugin = require("webpack-version-file-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = require("./config.js");

module.exports = _.merge({}, config, {
    output: {
        path: path.resolve(__dirname, "../build/prod"),
    },

    // devtool: 'eval',
    plugins: [
        new VersionFilePlugin({
            packageFile: path.resolve(__dirname, "../package.json"),
            template: path.resolve(__dirname, "../src/manifest.json"),
            outputFile: path.resolve(__dirname, "../build/prod/manifest.json"),
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, "../src/assets/icons"),
                to: path.resolve(__dirname, "../build/prod/data"),
                context: path.resolve(__dirname, "../src/assets/icons"),
            }],
        }),
        ...config.plugins,
        new WebExtPlugin({sourceDir: "../build/prod"}),
    ],
});
