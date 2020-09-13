import React from "react";
import type {AppProps} from "next/app";
import {ApolloProvider} from "@apollo/client";
import {getApolloClient} from "../graphql/apollo";

const App: React.FunctionComponent<AppProps> = ({Component, pageProps}) => {
    const client = getApolloClient();
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
};

export default App;
