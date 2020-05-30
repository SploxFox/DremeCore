import { Dreme } from "..";
import { Actions } from "./actions";

export type Transformer = (current: Dreme, next: Dreme, actions: Actions) => Dreme | Actions