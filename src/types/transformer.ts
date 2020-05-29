import { Nightmare } from "./nightmares";
import { Dreme } from "..";

export type DremeTransformer = (current: Dreme, next: Dreme) => Dreme | Nightmare