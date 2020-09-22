import {gql, useMutation} from "@apollo/client";
import {Button, TextField} from "@material-ui/core";
import React from "react";
import useForm from "../forms/useForm";
import MutationButton from "../forms/MutationButton";

const doStuffMutation = gql`
    mutation doStuff($blah: String!) {
        doStuff(blah: $blah) {
            id
        }
    }
`;

const Form = () => {
    const {useTextField, submit} = useForm();
    const [email, emailField] = useTextField("", n => !n.includes("@") && "Must be an email");
    const [num, numField] = useTextField(
        0,
        () => undefined,
        n => parseInt(n)
    );
    const doStuff = useMutation<{id: string}, {blah: string}>(doStuffMutation);

    return (
        <div>
            <TextField
                autoFocus
                required
                label="your email"
                name="email"
                type="email"
                variant="outlined"
                helperText="test"
                {...emailField}
            />

            <TextField required label="some number" name="blah" type="number" variant="outlined" {...numField} />

            <Button onClick={submit(() => console.log(email, num))}>Blah</Button>

            <MutationButton mutation={doStuff} onClick={mut => mut({variables: {blah: "test"}})}>
                Test
            </MutationButton>
        </div>
    );
};
export default Form;
