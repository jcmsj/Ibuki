import { Dispatch, SetStateAction } from "react";

export interface Provider<T> extends Dispatch<SetStateAction<T>> {};

export function prepSync<T>(provider:Provider<T>, receiver:Provider<T>) {
    return () => provider(t => {
        receiver(t)
        return t;
    });
}

export default prepSync;