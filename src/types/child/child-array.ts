import { ChildWithParent } from "./child-with-parent";
import { includes } from "../../util/arrays";

export class ChildArray<P, I> implements ChildWithParent<P> {
    protected items: I[] = [];

    constructor(readonly parent: P) {
        
    }
    
    add(...symbols: I[]) {
        symbols.forEach(this.addOne.bind(this));
        return this.parent;
    }

    remove(...items: I[]) {
        this.items = this.items.filter((item) => includes(items, item));
    }

    protected addOne(item: I) {
        this.items.push(item);
    }
}
