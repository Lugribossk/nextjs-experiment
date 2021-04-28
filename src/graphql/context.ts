import cookie, {CookieSerializeOptions} from "cookie";
import type {Sequelize} from "sequelize";
import type {ServerResponse} from "http";
import type {Operation} from "@apollo/client";
import type {GetServerSidePropsContext} from "next";
import type {MicroRequest} from "apollo-server-micro/dist/types";
import {assertUser, UserToken} from "../auth";

export type ResolverContext = {
    db: Sequelize;
    setCookie(name: string, value: string, options?: CookieSerializeOptions): void;
    assertUser(): UserToken;
};

type ApolloServerMicroIntegration = {req: MicroRequest; res: ServerResponse};
type SchemaLinkIntegration = Operation;

export const createApiContext = (db: Sequelize) => {
    return ({req, res}: ApolloServerMicroIntegration): ResolverContext => {
        return {
            db: db,
            setCookie(name, value, options) {
                res.setHeader("Set-Cookie", cookie.serialize(name, value, options));
            },
            assertUser(): UserToken {
                return assertUser(req);
            }
        };
    };
};

export const createSsrContext = (db: Sequelize, gsspContext?: GetServerSidePropsContext) => {
    return (operation: SchemaLinkIntegration): ResolverContext => {
        return {
            db: db,
            setCookie(name, value, options) {
                if (!gsspContext) {
                    return;
                }
                gsspContext.res.setHeader("Set-Cookie", cookie.serialize(name, value, options));
            },
            assertUser(): UserToken {
                if (!gsspContext) {
                    throw new Error();
                }
                return assertUser(gsspContext.req);
            }
        };
    };
};
