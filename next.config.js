const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true"
});

module.exports = withBundleAnalyzer({
    poweredByHeader: false,
    distDir: "target/next",
    reactStrictMode: true,
    experimental: {
        modern: true
    },
    webpack(config) {
        config.module.rules.push(      {
            exclude: /node_modules/,
            test: /\.graphql$/,
            use: [{ loader: 'graphql-import-loader' }]
        });

        return config;
    }
});
