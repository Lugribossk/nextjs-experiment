import {Button, ButtonProps} from "@mui/material";
import React from "react";

export const LoadingButton: React.FunctionComponent<ButtonProps & {loading: boolean}> = ({
    loading,
    disabled,
    children,
    ...rest
}) => {
    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Button disabled={disabled || loading} {...(rest as any)}>
            {loading ? "Loading..." : children}
        </Button>
    );
};
