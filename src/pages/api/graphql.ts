import {getApolloServer} from "../../graphql/apolloNode";
import {createDb} from "../../db";

const db = createDb();

const handler = getApolloServer(db).createHandler({path: "/api/graphql"});

export const config = {
    api: {
        bodyParser: false
    }
};

export default handler;
