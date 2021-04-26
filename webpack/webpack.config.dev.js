const path = require("path");

// eslint-disable-next-line import/no-extraneous-dependencies
const _ = require("lodash");
const VersionFilePlugin = require("webpack-version-file-plugin");

const config = require("./config.js");


module.exports = _.merge({}, config, {
    output: {
        path: path.resolve(__dirname, "../build/dev"),
    },

    mode: "development",
    devtool: "source-map",
    watch: true,

    plugins: [
        new VersionFilePlugin({
            packageFile: path.resolve(__dirname, "../package.json"),
            template: path.resolve(__dirname, "../src/manifest.json"),
            outputFile: path.resolve(__dirname, "../build/dev/manifest.json"),
        }),
        ...config.plugins,
    ],
});
