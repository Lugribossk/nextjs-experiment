import {gql, useQuery} from "@apollo/client";
import {CircularProgress, Typography} from "@mui/material";
import {GetServerSideProps} from "next";
import React from "react";

import {Suspender} from "../src/suspense/Suspender";

let x: Suspender<string>;
const suspenseLoad = () => {
    if (!x) {
        x = new Suspender(new Promise(resolve => setTimeout(() => resolve("blah"), 2000)));
    }
    return x.valueOrThrow();
};

// interface Props {}

const Index: React.FunctionComponent = () => {
    // const {loading, error, data} = useQuery(
    //     gql`
    //         query blah($id: ID!) {
    //             getUser(id: $id) {
    //                 name
    //             }
    //         }
    //     `,
    //     {variables: {id: "test"}}
    // );
    // if (loading) {
    //     return <CircularProgress />;
    // }
    // if (error) {
    //     console.log(error);
    //     return <p>Error</p>;
    // }
    // blah();

    const name = suspenseLoad();

    return (
        <>
            <Typography variant="h1">Hello world {name}</Typography>
        </>
    );
};
export default Index;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     getApolloClient(context);
//     return {props: {}};
// }
