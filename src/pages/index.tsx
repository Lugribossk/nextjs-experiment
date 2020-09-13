import {gql, useQuery} from "@apollo/client";
import React from "react";
import {GetServerSideProps} from "next";
import {getApolloClient} from "../graphql/apollo";

const blah = async () => {
    const x = await Promise.resolve("test");
    throw new Error("bah");
};

interface Props {}

const Index: React.FunctionComponent<Props> = ({}) => {
    const {loading, error, data} = useQuery(
        gql`
            query blah($id: ID!) {
                getUser(id: $id) {
                    name
                }
            }
        `,
        {variables: {id: "test"}}
    );
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        console.log(error);
        return <p>Error</p>;
    }
    // blah();
    return (
        <>
            <h1>Hello {data.getUser.name}</h1>
        </>
    );
};
export default Index;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     getApolloClient(context);
//     return {props: {}};
// }
