import {gql, useMutation} from "@apollo/client";
import React from "react";
import GoogleLogin from "react-google-login";

const LoginPage = () => {
    const [login, {loading}] = useMutation(gql`
        mutation blah($idToken: String!) {
            loginWithGoogle(idToken: $idToken) {
                token
            }
        }
    `);

    return (
        <GoogleLogin
            clientId={""}
            onSuccess={(response: any) => {
                login({variables: {idToken: response.tokenId}});
            }}

        >
            Login
        </GoogleLogin>
    );
};

export default LoginPage;
