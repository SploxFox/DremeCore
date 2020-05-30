import { Dreme } from ".";
import { Actions } from "./types/actions";
import { Transformer } from "./types/transformer";


export class TransformerApplier {
    i = 0;
    hasApplied = false;
    transformerStack: Transformer[] = [];
    oldDremes: Dreme[];
    newDremes: Dreme[] = [];
    private constructor (transformer: Transformer, private readonly dreme: Dreme) {
        this.transformerStack.push(transformer);
        this.oldDremes = this.dreme.children.array;
    }

    private apply() {
        if (this.hasApplied) {
            throw "Already applied this TransformerApplier!";
        } else {
            this.hasApplied = true;
        }
        
        let currentNewDreme;
        for (; this.i < this.oldDremes.length; this.i++) {
            const currentOldDreme = this.oldDremes[this.i];
    
            if (!currentNewDreme) {
                currentNewDreme = new Dreme();
            }

            const actions = this.transformerStack[0](currentNewDreme, currentOldDreme, new Actions([]));
            this.applyActions(actions);
        }
        if (currentNewDreme) {
            this.newDremes.push(currentNewDreme);
        }

        return new Dreme(this.newDremes);
    }

    private applyActions(actions: Actions) {
        for (const action of actions.actions) {
            this.applyAction(action.action, action.args);
        }
    }

    private applyAction(action: string, args: any[]) {
        switch (action) {
            case "end":
                this.transformerStack.shift();
                return;
            case "remove":
                this.newDremes.splice(this.i + args[0]);
                return;
            case "insert":
                this.newDremes.splice(this.i + args[1], 0, args[0]);
                return;
            case "add":
                this.newDremes.push(args[0]);
                return;
            case "open":
                this.transformerStack.unshift(args[0]);
                return;
            case "jump":
                this.i += args[0];
                return;
            case "set":
                this.
        }
    }

    static apply(transformer: Transformer, dreme: Dreme) {
        const applier = new this(transformer, dreme);
        return applier.apply();
    }
}
