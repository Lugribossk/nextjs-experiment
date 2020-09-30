import React from "react";
import type {AppProps, NextWebVitalsMetric} from "next/app";
import {ApolloProvider} from "@apollo/client";
import {getApolloClient} from "../graphql/apollo";
import Head from "next/head";

// export const reportWebVitals = (metric: NextWebVitalsMetric ) => {
//     console.log(metric);
// }

const App: React.FunctionComponent<AppProps> = ({Component, pageProps}) => {
    const client = getApolloClient();
    return (
        <ApolloProvider client={client}>
            <Head>
                <title>Test</title>
            </Head>
            <Component {...pageProps} />
        </ApolloProvider>
    );
};
export default App;
