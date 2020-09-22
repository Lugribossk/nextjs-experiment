import {ApolloClient, InMemoryCache} from "@apollo/client";
import {SchemaLink} from "@apollo/client/link/schema";
import {ApolloServer} from "apollo-server-micro";
import {makeExecutableSchema} from "@graphql-tools/schema";
import typeDefs from "../../schema/schema.graphql";
import type {Sequelize} from "sequelize";
import {createApiContext, createSsrContext} from "./context";
import resolvers from "./resolvers";
import type {GetServerSidePropsContext} from "next";

const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});

export const getApolloServer = (db: Sequelize) => {
    return new ApolloServer({
        schema: schema,
        debug: process.env.NODE_ENV !== "production",
        context: createApiContext(db)
    });
};

export const getApolloClientNode = (db: Sequelize, gsspContext?: GetServerSidePropsContext) => {
    return new ApolloClient({
        link: new SchemaLink({
            schema: schema,
            context: createSsrContext(db, gsspContext)
        }),
        ssrMode: true,
        cache: new InMemoryCache()
    });
};
