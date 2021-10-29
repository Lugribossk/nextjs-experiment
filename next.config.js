const {PHASE_PRODUCTION_BUILD} = require("next/constants");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");

module.exports = phase => ({
    poweredByHeader: false,
    distDir: process.env.NODE_ENV === 'test' ? 'target/.next-test' : 'target/.next',
    reactStrictMode: true,
    // experimental: {
    //     modern: true
    // },
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack(config, options) {
        // config.module.rules.push({
        //     exclude: /node_modules/,
        //     test: /\.graphql$/,
        //     use: [{loader: "graphql-import-loader"}]
        // });

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
    },
    async headers() {
        return [
            {
                source: "/",
                headers: [
                    {
                        key: "Cross-Origin-Embedder-Policy",
                        value: "require-corp"
                    },
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "same-origin"
                    }
                ]
            }
        ];
    }
});
