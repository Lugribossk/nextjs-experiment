import type {MutationFunctionOptions, MutationTuple} from "@apollo/client";
import type {FetchResult} from "@apollo/client/link/core";
import {Button, ButtonProps} from "@material-ui/core";
import React from "react";

type MutationButtonProps<TData, TVariables> = {
    mutation: MutationTuple<TData, TVariables>;
    loadingSnack?: string;
    successSnack?: string;
    errorSnack?: string;
    onClick(mutant: (options?: MutationFunctionOptions<TData, TVariables>) => Promise<FetchResult<TData>>): void;
} & Omit<ButtonProps, "onClick">;

const MutationButton = <TData, TVariables>({
    mutation,
    disabled,
    onClick,
    children,
    ...rest
}: MutationButtonProps<TData, TVariables>) => {
    const [mutationFunction, {error, loading}] = mutation;

    return (
        <Button
            disabled={disabled || loading}
            onClick={e => {
                e.preventDefault();
                onClick(mutationFunction);
            }}
            {...rest}
        >
            {loading ? "Loading..." : children}
        </Button>
    );
};
export default MutationButton;
