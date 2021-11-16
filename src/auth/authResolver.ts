import type {IncomingMessage} from "http";

import {AuthenticationError} from "apollo-server-micro";
import type {CookieSerializeOptions} from "cookie";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import ms from "ms";

import type {AllResolvers} from "../graphql/resolvers";

const ALGORITHM = "HS256";
const SECRET = "TODO";
const ISSUER = "TODO";
const COOKIE_NAME = "authorization";
const COOKIE_DURATION = "7d";

export interface UserToken {
    id: string;
}

const createAuthToken = (subject: string, payload: UserToken) => {
    return jwt.sign(payload, SECRET, {
        algorithm: ALGORITHM,
        expiresIn: COOKIE_DURATION,
        issuer: ISSUER,
        subject: subject
    });
};

const getValidToken = (token: string): UserToken => {
    return jwt.verify(token, SECRET, {
        algorithms: [ALGORITHM],
        issuer: ISSUER
    }) as UserToken;
};

export const getUserToken = (req: IncomingMessage): UserToken | undefined => {
    let authorization: string | undefined;
    if (req.headers.authorization?.startsWith("Bearer ")) {
        authorization = req.headers.authorization.slice(7);
    } else if (req.headers.cookie) {
        authorization = cookie.parse(req.headers.cookie)[COOKIE_NAME];
    }
    if (!authorization) {
        return undefined;
    }
    try {
        return getValidToken(authorization);
    } catch {
        return undefined;
    }
};

const cookieOptions: CookieSerializeOptions = {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV !== "development"
};

export const authResolver: AllResolvers = {
    Query: {
        currentUser: (p, args, {getUser}) => {
            return {id: "current", user: getUser() || null};
        }
    },
    Mutation: {
        login(p, {username, password}, {setCookie}) {
            if (username !== "test" || password !== "test") {
                throw new AuthenticationError("");
            }

            const user = {
                id: "123",
                name: "TODO",
                email: "TODO"
            };
            const token = createAuthToken(username, {id: user.id});

            setCookie(COOKIE_NAME, token, {
                maxAge: Math.round(ms(COOKIE_DURATION) / 1000),
                ...cookieOptions
            });
            return {
                id: "current",
                user: user
            };
        },
        logout(p, args, {setCookie}) {
            setCookie(COOKIE_NAME, "", {
                maxAge: -1,
                ...cookieOptions
            });
            return {id: "current"};
        }
    }
};
