import {Typography} from "@mui/material";
import React from "react";

const Static: React.FunctionComponent<{blah: string}> = ({blah}) => {
    return <Typography variant="h1">Static {blah}</Typography>;
};

export default Static;

export const getStaticProps = () => {
    return {
        props: {
            blah: "Test"
        }
    };
};
