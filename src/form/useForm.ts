import {ChangeEvent, MouseEvent, useState} from "react";

type UseForm = () => {
    useTextFieldState: UseTextFieldState;
    submit(onValid: (e: MouseEvent<HTMLButtonElement>) => void): (e: MouseEvent<HTMLButtonElement>) => void;
};

type UseTextFieldState = <T>(
    defaultValue: T,
    validate?: (value: T) => string | undefined | false,
    transform?: (raw: string) => T
) => [T, TextFieldValidationProps];

type TextFieldValidationProps = {
    error: boolean;
    helperText?: string;
    value: unknown;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
    onBlur(): void;
};

const useForm: UseForm = () => {
    const [errors] = useState<Set<string>>(() => new Set());

    const useTextFieldState: UseTextFieldState = (defaultValue, validate = n => undefined, transform = n => n as any) => {
        const [id] = useState(() => `${Math.random()}`);
        const [value, setValue] = useState(defaultValue);
        const [touched, setTouched] = useState(false);
        const [error, setError] = useState<string | undefined | false>(() => {
            const initialError = validate(defaultValue);
            if (initialError) {
                errors.add(id);
            }
            return initialError;
        });

        const props: TextFieldValidationProps = {
            error: !!(touched && error),
            value: value,
            onChange(e) {
                const newValue = transform(e.target.value);
                const validationError = validate(newValue);
                if (validationError) {
                    setError(validationError);
                    errors.add(id);
                } else {
                    setError("");
                    errors.delete(id);
                }
                setValue(newValue);
            },
            onBlur() {
                setTouched(true);
            }
        };
        if (touched && error) {
            props.helperText = error;
        }

        return [value, props];
    };

    const submit = (callback: (e: MouseEvent<HTMLButtonElement>) => void) => {
        return (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            if (errors.size === 0) {
                callback(e);
            }
        };
    };

    return {useTextFieldState, submit};
};

export default useForm;
