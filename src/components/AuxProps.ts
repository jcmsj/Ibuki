import { PropsWithChildren } from "react";

export interface AuxProps<T = any> extends PropsWithChildren {
    props?: T;
}