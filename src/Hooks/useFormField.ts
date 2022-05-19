import React, { useCallback, useState } from "react";

const useFormField = (initialValue: string = "") => {
    const [value, setValue] = useState(initialValue);
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),[])

    return { value, onChange }
}

export default useFormField;