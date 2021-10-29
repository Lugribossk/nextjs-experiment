import type {NextApiRequest, NextApiResponse} from "next";

import {createDb} from "../../src/db";
import {getApolloServer} from "../../src/graphql/apolloNode";

const db = createDb();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const apollo = getApolloServer(db);
    await apollo.start();
    await apollo.createHandler({path: "/api/graphql"})(req, res);
};
export default handler;

export const config = {
    api: {
        bodyParser: false
    }
};
