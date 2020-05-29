import { ChildWithParent } from "./child-with-parent";
import { includes } from "../../util/arrays";

export class ChildArray<P, I> implements ChildWithParent<P> {
    protected items: I[] = [];

    constructor(readonly parent: P, items?: I[]) {
        if (items) {
            this.items = items.slice();
        }
    }
    
    add(...symbols: I[]) {
        symbols.forEach(this.addOne.bind(this));
        return this.parent;
    }

    remove(...items: I[]) {
        this.items = this.items.filter((item) => includes(items, item));
    }

    get array() {
        return this.items.slice();
    }

    protected addOne(item: I) {
        this.items.push(item);
    }
}
