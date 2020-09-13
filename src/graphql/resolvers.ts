import type {MutationResolvers, QueryResolvers, Resolvers} from "../../target/codegen/graphql";

const queryResolvers: Required<QueryResolvers> = {
    getUser(_, {id}) {
        return {id: id, name: "world"};
    }
};

const mutationResolvers: Required<MutationResolvers> = {
    updateUser(_, {user}) {
        return user;
    }
};

const resolvers: Resolvers = {
    Query: queryResolvers,
    Mutation: mutationResolvers
};

export default resolvers;
