import type {Resolvers} from "../../target/codegen/graphql";

export const userResolver: Resolvers = {
    Query: {
        currentUser: () => {
            return {
                id: "123",
                name: "test",
                email: "test@example.com"
            };
        }
    },
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
