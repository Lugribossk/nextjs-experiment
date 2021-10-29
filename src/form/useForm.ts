/* eslint-disable react-hooks/rules-of-hooks,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-return */
import {ChangeEvent, MouseEvent, useRef, useState} from "react";

type UseForm = () => {
    useTextFieldState: UseTextFieldState;
    useSubmitButton: UseSubmitButton;
};

type UseTextFieldState = <T = string>(
    defaultValue: T,
    validate?: (value: T) => string | undefined | null | false,
    transform?: (raw: string) => T
) => [T, TextFieldValidationProps<T>];

interface TextFieldValidationProps<T = string> {
    error: boolean;
    helperText?: string;
    value: T;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
    onBlur(): void;
}

type UseSubmitButton = (onValid: (e: MouseEvent<HTMLButtonElement>) => Promise<unknown>) => [
    {
        loading: boolean;
        onClick(e: MouseEvent<HTMLButtonElement>): void;
    }
];

const useForm: UseForm = () => {
    const fields = useRef(new Set<(t: boolean) => void>());
    const errors = useRef(new Set<string>());

    const useTextFieldState = useRef<UseTextFieldState>(
        (defaultValue, validate = n => undefined, transform = n => n as any) => {
            const [id] = useState(() => `${Math.random()}`);
            const [value, setValue] = useState(defaultValue);
            const [touched, setTouched] = useState(false);

            fields.current.add(setTouched);
            const error = validate(value);
            if (error) {
                errors.current.add(id);
            } else {
                errors.current.delete(id);
            }

            const props: TextFieldValidationProps<any> = {
                error: !!(touched && error),
                value: value,
                onChange(e) {
                    setValue(transform(e.target.value));
                },
                onBlur() {
                    setTouched(true);
                }
            };
            if (touched && error) {
                props.helperText = error;
            }

            return [value, props];
        }
    );

    const useSubmitButton = useRef<UseSubmitButton>(onValid => {
        const [loading, setLoading] = useState(false);

        const props = {
            loading: loading,
            async onClick(e: MouseEvent<HTMLButtonElement>) {
                e.preventDefault();
                if (errors.current.size > 0) {
                    fields.current.forEach(f => f(true));
                } else {
                    setLoading(true);
                    try {
                        await onValid(e);
                    } finally {
                        setLoading(false);
                    }
                }
            }
        };
        return [props];
    });

    return {
        useTextFieldState: useTextFieldState.current,
        useSubmitButton: useSubmitButton.current
    };
};

export default useForm;
