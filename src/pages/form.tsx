import {gql, useMutation} from "@apollo/client";
import {Button, TextField} from "@material-ui/core";
import React from "react";
import useForm from "../form/useForm";
import LoadingButton from "../form/LoadingButton";

const doStuffMutation = gql`
    mutation doStuff($blah: String!) {
        doStuff(blah: $blah) {
            id
        }
    }
`;

const Form = () => {
    const {useTextFieldState, useSubmitButton} = useForm();
    const [email, emailField] = useTextFieldState("", n => !n.includes("@") && "Must be an email");
    const [num, numField] = useTextFieldState(
        0,
        undefined,
        parseInt
    );
    const [doStuff] = useMutation<{id: string}, {blah: string}>(doStuffMutation);
    const [submitButton] = useSubmitButton(() => {
        return doStuff({variables: {blah: "test"}});
    });

    return (
        <div>
            <TextField
                autoFocus
                required
                label="your email"
                type="email"
                variant="outlined"
                helperText="test"
                {...emailField}
            />

            <TextField required label="some number" type="number" variant="outlined" {...numField} />

            <LoadingButton color="primary" variant="outlined" {...submitButton}>Blah</LoadingButton>
        </div>
    );
};
export default Form;
