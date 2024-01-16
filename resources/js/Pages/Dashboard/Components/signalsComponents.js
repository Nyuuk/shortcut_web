import { signal } from "@preact/signals-react";

const signalsComponents = {
    loading: signal(false),
    test: signal(0),
    data: signal({}),
};
export default signalsComponents;

export const deleteObjectFromSignalObject = (from, key) => {
    const obj = signalsComponents[from].value;
    delete obj[key];
    signalsComponents[from].value = obj;
};
