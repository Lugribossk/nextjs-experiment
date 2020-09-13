import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import type {GetServerSidePropsContext} from "next";

let client: ApolloClient<{}> | undefined;

export const getApolloClient = (gsspContext?: GetServerSidePropsContext) => {
    if (client) {
        return client;
    }

    if (process.browser) {
        client = new ApolloClient({
            link: new HttpLink({uri: "/api/graphql"}),
            cache: new InMemoryCache()
        });
    } else {
        const {getApolloClientNode} = require("./apolloNode");
        const {createDb} = require("../db");
        client = getApolloClientNode(createDb(), gsspContext);
    }

    return client!;
};