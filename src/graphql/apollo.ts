/* eslint-disable @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires */
import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import type {GetServerSidePropsContext} from "next";

let client: ApolloClient<unknown> | undefined;

export const getApolloClient = (gsspContext?: GetServerSidePropsContext) => {
    if (client) {
        return client;
    }

    if (process.browser) {
        client = new ApolloClient({
            link: new HttpLink({uri: "/api/graphql", credentials: "same-origin"}),
            cache: new InMemoryCache(),
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: "cache-and-network"
                }
            }
        });
    } else {
        // TODO don't reuse client server-side?
        const {getApolloClientNode} = require("./apolloNode") as typeof import("./apolloNode");
        const {createDb} = require("../db") as typeof import("../db");
        client = getApolloClientNode(createDb(), gsspContext);
    }

    return client;
};
