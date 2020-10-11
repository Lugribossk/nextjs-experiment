import {Button, ButtonProps} from "@material-ui/core";
import React from "react";

const LoadingButton: React.FunctionComponent<ButtonProps & {loading: boolean}> = ({
    loading,
    disabled,
    children,
    ...rest
}) => {
    return (
        <Button disabled={disabled || loading} {...rest}>
            {loading ? "Loading..." : children}
        </Button>
    );
};
export default LoadingButton;
