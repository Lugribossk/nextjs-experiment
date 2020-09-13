import type {Sequelize} from "sequelize";
import type {ServerResponse} from "http";
import type {Operation} from "@apollo/client";
import type {GetServerSidePropsContext} from "next";
import type {MicroRequest} from "apollo-server-micro/dist/types";

export type ResolverContext = {
    db: Sequelize;
};

type ApolloServerMicroIntegration = {req: MicroRequest; res: ServerResponse};
type SchemaLinkIntegration = Operation;

export const createApiContext = (db: Sequelize) => {
    return ({req, res}: ApolloServerMicroIntegration): ResolverContext => {
        return {
            db: db
        };
    };
};

export const createSsrContext = (db: Sequelize, gsspContext?: GetServerSidePropsContext) => {
    return (operation: SchemaLinkIntegration): ResolverContext => {
        return {
            db: db
        };
    };
};
