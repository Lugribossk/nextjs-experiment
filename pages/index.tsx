import {CircularProgress, Typography} from "@mui/material";
import React from "react";

import {AuthLayout} from "../src/layout/AuthLayout";

const IndexPage: React.FunctionComponent = () => {
    return (
        <AuthLayout>
            <Typography variant="h1">Hello world</Typography>
        </AuthLayout>
    );
};
export default IndexPage;
