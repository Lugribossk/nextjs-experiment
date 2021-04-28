import jwt from "jsonwebtoken";
import {OAuth2Client} from "google-auth-library";
import type {MutationResolvers} from "../target/codegen/graphql";
import ms from "ms";
import type {CookieSerializeOptions} from "cookie";
import cookie from "cookie";
import type {IncomingMessage} from "http";

const ALGORITHM = "HS256";
const SECRET = "TODO";
const ISSUER = "TODO";
const COOKIE_NAME = "authorization";
const COOKIE_DURATION = "7d";

export type UserToken = {
    name: string;
    email: string;
};

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
    }) as any;
};

export const assertUser = (req: IncomingMessage) => {
    let authorization: string | undefined;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        authorization = req.headers.authorization.slice(7);
    }
    if (!authorization && req.headers.cookie) {
        authorization = cookie.parse(req.headers.cookie)[COOKIE_NAME];
    }
    if (!authorization) {
        throw new Error("Auth token or cookie not found");
    }
    return getValidToken(authorization);
};

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const client = new OAuth2Client(googleClientId);
const cookieOptions: CookieSerializeOptions = {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV !== "development"
};

export const authResolvers: Required<Pick<MutationResolvers, "loginWithGoogle" | "login" | "logout">> = {
    async loginWithGoogle(_, {idToken}, {setCookie}) {
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: googleClientId
        });

        const payload = ticket.getPayload();
        if (!payload) {
            throw new Error();
        }

        const domain = payload.hd;
        const userId = payload.sub;
        const name = payload.name;
        const email = payload.email;

        if (!name || !email) {
            throw new Error();
        }

        const token = createAuthToken(email, {
            name: name,
            email: email
        });

        setCookie(COOKIE_NAME, token, {
            maxAge: Math.round(ms(COOKIE_DURATION) / 1000),
            ...cookieOptions
        });
        return {token: token};
    },
    async login(_, {username, password}, {setCookie}) {
        // TODO

        const token = createAuthToken(username, {
            name: "TODO",
            email: username
        });

        setCookie(COOKIE_NAME, token, {
            maxAge: Math.round(ms(COOKIE_DURATION) / 1000),
            ...cookieOptions
        });
        return {token: token};
    },
    async logout(_, {}, {setCookie}) {
        setCookie(COOKIE_NAME, "", {
            maxAge: -1,
            ...cookieOptions
        });
        return "";
    }
};
