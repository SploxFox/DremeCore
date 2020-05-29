import { Dreme } from "..";

//Technically this should be called an "application" but it has this name to avoid ambiguity
export type DremeApplier = (dreme: Dreme) => Dreme;