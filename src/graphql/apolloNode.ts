import fs from "fs";
import path from "path";

import {ApolloClient, InMemoryCache} from "@apollo/client";
import {SchemaLink} from "@apollo/client/link/schema";
import {mergeResolvers, mergeTypeDefs} from "@graphql-tools/merge";
import {makeExecutableSchema} from "@graphql-tools/schema";
import {ApolloServer} from "apollo-server-micro";
import fg from "fast-glob";
import {GraphQLSchema, parse} from "graphql";
import type {GetServerSidePropsContext} from "next";
import type {Sequelize} from "sequelize";

import {authResolver} from "../auth/auth";
import {userResolver} from "../auth/userResolver";

import {createResolverContextForApi, createResolverContextForSsr, ResolverContext} from "./ResolverContext";

if (process.browser) {
    console.warn("Node-only code was imported in the browser");
}

const RESOLVERS = [userResolver, authResolver];

let schema: GraphQLSchema;
const getSchema = () => {
    if (!schema) {
        const typeSource = fg
            .sync(path.join(process.cwd(), "./src/**/*.graphql").replace(/\\/g, "/"), {onlyFiles: true})
            .map(path => {
                const content = fs.readFileSync(path, "utf8");
                return parse(content);
            });
        const typeDefs = mergeTypeDefs(typeSource);
        const resolvers = mergeResolvers<unknown, ResolverContext>(RESOLVERS);

        schema = makeExecutableSchema<ResolverContext>({
            typeDefs: typeDefs,
            resolvers: resolvers,
            logger: {
                log: e => console.warn(e)
            }
        });
    }
    return schema;
};

export const getApolloServer = (db: Sequelize) => {
    return new ApolloServer({
        schema: getSchema(),
        debug: process.env.NODE_ENV !== "production",
        context: createResolverContextForApi(db)
    });
};

export const getApolloClientNode = (db: Sequelize, gsspContext?: GetServerSidePropsContext) => {
    return new ApolloClient({
        link: new SchemaLink({
            schema: getSchema(),
            context: createResolverContextForSsr(db, gsspContext)
        }),
        ssrMode: true,
        cache: new InMemoryCache(),
        defaultOptions: {
            query: {
                fetchPolicy: "no-cache"
            },
            mutate: {
                fetchPolicy: "no-cache"
            },
            watchQuery: {
                fetchPolicy: "no-cache"
            }
        }
    });
};
