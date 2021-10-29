import {ApolloProvider} from "@apollo/client";
import createCache from "@emotion/cache";
import {CacheProvider, EmotionCache} from "@emotion/react";
import {CssBaseline} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import type {AppProps, NextWebVitalsMetric} from "next/app";
import Head from "next/head";
import React, {Suspense, useEffect} from "react";

import {getApolloClient} from "../src/graphql/apollo";
import theme from "../src/muiTheme";
import "../src/styles.css";

// export const reportWebVitals = (metric: NextWebVitalsMetric ) => {
//     console.log(metric);
// }

const MaybeSuspense: React.FunctionComponent<{bypass: boolean | undefined}> = ({bypass, children}) => {
    if (bypass) {
        return <>{children}</>;
    }
    if (process.browser) {
        return <Suspense fallback="Loading...">{children}</Suspense>;
    }
    return null;
};

const clientSideEmotionCache = createCache({key: "css"});

interface Blah extends AppProps {
    emotionCache?: EmotionCache;
}

const App: React.FunctionComponent<Blah> = ({
    Component,
    pageProps,
    __N_SSG: isSsr,
    emotionCache = clientSideEmotionCache
}) => {
    const client = getApolloClient();

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>Test</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ApolloProvider client={client}>
                    <MaybeSuspense bypass={isSsr}>
                        <Component {...pageProps} />
                    </MaybeSuspense>
                </ApolloProvider>
            </ThemeProvider>
        </CacheProvider>
    );
};
export default App;
