import {Button, ButtonTypeMap} from "@mui/material";
import React from "react";

export const LoadingButton: React.FunctionComponent<ButtonTypeMap["props"] & {loading: boolean}> = ({
    loading,
    disabled,
    children,
    ...rest
}) => {
    return <Button disabled={disabled || loading}>{loading ? "Loading..." : children}</Button>;
};
