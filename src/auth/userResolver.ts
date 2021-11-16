import type {AllResolvers} from "../graphql/resolvers";

export const userResolver: AllResolvers = {
    Query: {},
    Mutation: {
        doStuff: () => {
            return {
                id: "123",
                name: "test",
                email: "test@example.com"
            };
        }
    }
};
