import {gql, useMutation, useQuery} from "@apollo/client";
import {Container, Grid, Stack, TextField} from "@mui/material";
import React, {useState} from "react";

import {LoadingButton} from "../form/LoadingButton";
import type {AuthLayoutQuery} from "../graphql/operations";

export const AuthLayout: React.FunctionComponent = ({children}) => {
    const {data, loading} = useQuery<AuthLayoutQuery>(QUERY);
    if (loading || !data) {
        return <>Loading...</>;
    }
    if (!data.currentUser.user) {
        return <LoginForm />;
    }
    return <>{children}</>;
};

const QUERY = gql`
    query AuthLayout {
        currentUser {
            id
            user {
                id
                name
                email
            }
        }
    }
`;

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login, {loading}] = useMutation(LOGIN);

    return (
        <Container maxWidth="sm">
            <Stack>
                <TextField
                    label="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    fullWidth
                    autoComplete="username"
                    autoFocus
                    autoCorrect="off"
                    autoCapitalize="none"
                />
                <TextField
                    type="password"
                    label="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    fullWidth
                    autoComplete="current-password"
                />
                <LoadingButton
                    fullWidth
                    loading={loading}
                    onClick={() =>
                        login({
                            variables: {
                                username: username,
                                password: password
                            }
                        })
                    }
                >
                    Log in
                </LoadingButton>
            </Stack>
        </Container>
    );
};

const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            user {
                id
                name
                email
            }
        }
    }
`;
