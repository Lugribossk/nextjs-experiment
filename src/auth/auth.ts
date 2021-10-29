import type {IncomingMessage} from "http";
import jwt from "jsonwebtoken";
import ms from "ms";
import type {CookieSerializeOptions} from "cookie";
import cookie from "cookie";

const ALGORITHM = "HS256";
const SECRET = "TODO";
const ISSUER = "TODO";
const COOKIE_NAME = "authorization";
const COOKIE_DURATION = "7d";

export interface UserToken {
    name: string;
    email: string;
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

export const assertUser = (req: IncomingMessage) => {
    let authorization: string | undefined;
    if (req.headers.authorization?.startsWith("Bearer ")) {
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

const cookieOptions: CookieSerializeOptions = {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV !== "development"
};

// export const authResolvers: Required<Pick<MutationResolvers, "loginWithGoogle" | "login" | "logout">> = {
//     async login(_, {username, password}, {setCookie}) {
//         // TODO
//
//         const token = createAuthToken(username, {
//             name: "TODO",
//             email: username
//         });
//
//         setCookie(COOKIE_NAME, token, {
//             maxAge: Math.round(ms(COOKIE_DURATION) / 1000),
//             ...cookieOptions
//         });
//         return {token: token};
//     },
//     async logout(_, {}, {setCookie}) {
//         setCookie(COOKIE_NAME, "", {
//             maxAge: -1,
//             ...cookieOptions
//         });
//         return "";
//     }
// };
