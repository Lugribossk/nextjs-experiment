import jwt from "jsonwebtoken";
import {OAuth2Client} from "google-auth-library";
import type {MutationResolvers} from "../target/codegen/graphql";

const ALGORITHM = "HS256";
const SECRET = "TODO";
const ISSUER = "TODO";

export type UserToken = {
    name: string;
    email: string;
};

const signToken = (subject: string, payload: UserToken) => {
    return jwt.sign(payload, SECRET, {
        algorithm: ALGORITHM,
        expiresIn: "24h",
        issuer: ISSUER,
        subject: subject
    });
};

export const getValidToken = (token: string): UserToken => {
    return jwt.verify(token, SECRET, {
        algorithms: [ALGORITHM],
        issuer: ISSUER
    }) as any; // TODO string?
};

const GOOGLE_CLIENT_ID = "TODO";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const authResolvers: Required<Pick<MutationResolvers, "loginWithGoogle" | "logout">> = {
    async loginWithGoogle(_, {idToken}, {setCookie}) {
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: GOOGLE_CLIENT_ID
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

        const token = signToken(email, {
            name: name,
            email: email
        });

        setCookie("authorization", token, {
            maxAge: 86400,
            httpOnly: true,
            sameSite: "lax"
        });
        return token;
    },
    async logout(_, {}, {setCookie}) {
        setCookie("authorization", "", {
            maxAge: -1,
            httpOnly: true,
            sameSite: "lax"
        });
        return "";
    }
};
