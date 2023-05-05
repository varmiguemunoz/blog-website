import { useState } from "react"

export const useForm = ({type}) => {
    const [value, setValue] = useState('');
    const onChange = event => setValue(event.target.value);

    return {
        type,
        value,
        onChange
    }
}