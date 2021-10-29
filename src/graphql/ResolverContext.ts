import type {ServerResponse} from "http";

import type {Operation} from "@apollo/client";
import {AuthenticationError} from "apollo-server-micro";
import type {MicroRequest} from "apollo-server-micro/dist/types";
import cookie, {CookieSerializeOptions} from "cookie";
import type {GetServerSidePropsContext} from "next";
import type {Sequelize} from "sequelize";

import {getUser, UserToken} from "../auth/auth";

export interface ResolverContext {
    db: Sequelize;
    setCookie(name: string, value: string, options?: CookieSerializeOptions): void;
    getUser(): UserToken | undefined;
    assertUser(): UserToken;
}

interface ApolloServerMicroIntegration {
    req: MicroRequest;
    res: ServerResponse;
}
type SchemaLinkIntegration = Operation;

export const createResolverContextForApi = (db: Sequelize) => {
    return ({req, res}: ApolloServerMicroIntegration): ResolverContext => {
        const user = getUser(req);
        return {
            db: db,
            setCookie: (name, value, options) => {
                res.setHeader("Set-Cookie", cookie.serialize(name, value, options));
            },
            getUser: () => {
                return user;
            },
            assertUser: () => {
                if (!user) {
                    throw new AuthenticationError("");
                }
                return user;
            }
        };
    };
};

export const createResolverContextForSsr = (db: Sequelize, gsspContext?: GetServerSidePropsContext) => {
    return (operation: SchemaLinkIntegration): ResolverContext => {
        const user = gsspContext ? getUser(gsspContext.req) : undefined;
        return {
            db: db,
            setCookie: (name, value, options) => {
                gsspContext?.res.setHeader("Set-Cookie", cookie.serialize(name, value, options));
            },
            getUser: () => {
                return user;
            },
            assertUser: () => {
                if (!user) {
                    throw new AuthenticationError("");
                }
                return user;
            }
        };
    };
};
