import { ChildArray } from "./child-array";
import { includes } from "../../util/arrays";

export class NoDuplicatesChildArray<P, I> extends ChildArray<P, I> {
    protected addOne(item: I) {
        if (!includes(this.items, item)) {
            this.items.push(item);
        } else {
            //Item is already in the array. Do nothing
        }
    }
}