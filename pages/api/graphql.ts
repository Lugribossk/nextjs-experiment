import type {ServerResponse} from "http";

import type {MicroRequest} from "apollo-server-micro/dist/types";
import type {NextApiRequest, NextApiResponse} from "next";

import {createDb} from "../../src/db";
import {getApolloServer} from "../../src/graphql/apolloNode";

let apolloHandler: (req: MicroRequest, res: ServerResponse) => Promise<void>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!apolloHandler) {
        const apollo = getApolloServer(createDb());
        await apollo.start();
        apolloHandler = apollo.createHandler({path: "/api/graphql"});
    }
    await apolloHandler(req, res);
};
export default handler;

export const config = {
    api: {
        bodyParser: false
    }
};
