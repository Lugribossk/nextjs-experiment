const {PHASE_PRODUCTION_BUILD} = require("next/constants");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");

module.exports = phase => ({
    poweredByHeader: false,
    distDir: "target/next",
    reactStrictMode: true,
    experimental: {
        modern: true
    },
    webpack(config, options) {
        config.module.rules.push({
            exclude: /node_modules/,
            test: /\.graphql$/,
            use: [{loader: "graphql-import-loader"}]
        });

        if (phase === PHASE_PRODUCTION_BUILD) {
            config.plugins.push(
                new BundleAnalyzerPlugin({
                    analyzerMode: "static",
                    reportFilename: options.isServer ? "../../analyze/server.html" : "./../analyze/client.html",
                    openAnalyzer: false
                })
            );
        }

        return config;
    }
});
