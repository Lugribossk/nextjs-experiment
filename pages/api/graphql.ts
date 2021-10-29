import type {NextApiRequest, NextApiResponse} from "next";
import {getApolloServer} from "../../src/graphql/apolloNode";
import {createDb} from "../../src/db";

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
