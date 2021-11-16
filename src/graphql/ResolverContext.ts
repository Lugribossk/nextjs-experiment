import type {ServerResponse} from "http";

import type {Operation} from "@apollo/client";
import {AuthenticationError} from "apollo-server-micro";
import type {MicroRequest} from "apollo-server-micro/dist/types";
import cookie, {CookieSerializeOptions} from "cookie";
import type {GetServerSidePropsContext} from "next";
import type {Sequelize} from "sequelize";

import type {User} from "../auth/User";
import {getUserToken, UserToken} from "../auth/authResolver";

export interface ResolverContext {
    db: Sequelize;
    setCookie(name: string, value: string, options?: CookieSerializeOptions): void;
    getUser(): User | undefined;
    assertUser(): UserToken;
}

interface ApolloServerMicroIntegration {
    req: MicroRequest;
    res: ServerResponse;
}
type SchemaLinkIntegration = Operation;

export const createResolverContextForApi = (db: Sequelize) => {
    return ({req, res}: ApolloServerMicroIntegration): ResolverContext => create(db, req, res);
};

export const createResolverContextForSsr = (db: Sequelize, gsspContext?: GetServerSidePropsContext) => {
    return (operation: SchemaLinkIntegration): ResolverContext => create(db, gsspContext?.req, gsspContext?.res);
};

const create = (db: Sequelize, req: MicroRequest | undefined, res: ServerResponse | undefined): ResolverContext => {
    const token = req ? getUserToken(req) : undefined;
    return {
        db: db,
        setCookie: (name, value, options) => {
            res?.setHeader("Set-Cookie", cookie.serialize(name, value, options));
        },
        getUser: () => {
            if (!token) {
                return undefined;
            }

            return {
                id: "123",
                name: "TODO",
                email: "TODO"
            };
        },
        assertUser: () => {
            if (!token) {
                throw new AuthenticationError("");
            }
            return {
                id: "123",
                name: "TODO",
                email: "TODO"
            };
        }
    };
};
