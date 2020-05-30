import { Dreme } from "..";
import { Transformer } from "./transformer";

interface Action {
    action: string,
    args: any[]
}

export class Actions {
    constructor (private readonly _actions: Action[]) {

    }

    get actions () {
        return this._actions.slice();
    }

    private append(action: string, ...args: any[]) {
        return new Actions([...this.actions, {action, args}]);
    }

    end() {
        return this.append("end");
    }

    remove(relativeIndex: number) {
        return this.append("remove", relativeIndex);
    }

    insert(dreme: Dreme, relativeIndex: number) {
        return this.append("insert", dreme, relativeIndex)
    }

    add(dreme: Dreme) {
        return this.append("add", dreme);
    }

    open(transformer: Transformer) {
        return this.append("open", transformer);
    }

    jump(relativeIndex: number) {
        return this.append("jump", relativeIndex);
    }
}