import { useState } from "react";

export const useForm = (initialForm = {}) => {
    const [formState, setFormState] = useState(initialForm);

    const onInpuitChange = ({ target }) => {
        setFormState({
            ...formState,
            [target.name]: target.value,
        });
    };

    const onResertForm = () => {
        setFormState(initialForm);
    };

    return { ...formState, formState, onResertForm, onInpuitChange };
}