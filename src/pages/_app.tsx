import React, {useEffect} from "react";
import type {AppProps, NextWebVitalsMetric} from "next/app";
import {ApolloProvider} from "@apollo/client";
import {getApolloClient} from "../graphql/apollo";
import Head from "next/head";
import "../styles.scss";
import {CssBaseline, ThemeProvider} from "@material-ui/core";
import theme from "../muiTheme";

// export const reportWebVitals = (metric: NextWebVitalsMetric ) => {
//     console.log(metric);
// }

const App: React.FunctionComponent<AppProps> = ({Component, pageProps}) => {
    const client = getApolloClient();

    // https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement!.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <Head>
                <title>Test</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <ApolloProvider client={client}>
                    <Component {...pageProps} />
                </ApolloProvider>
            </ThemeProvider>
        </>
    );
};
export default App;
