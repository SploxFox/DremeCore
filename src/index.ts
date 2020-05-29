import { includes } from "./util/arrays";
import { NoDuplicatesChildArray } from "./types/child/no-duplicates-child-array";
import { ChildArray } from "./types/child/child-array";
import { Nightmare } from "./types/nightmares";
import { DremeTransformer } from "./types/transformer";
import { DremeApplier } from "./types/application";

/**
 * Zzzzz...
 * Life's a dreme...
 */
export class Dreme {
    public readonly identities = new NoDuplicatesChildArray<this, string>(this);
    public readonly children = new ChildArray<this, Dreme>(this);

    constructor(children?: Dreme[], private readonly ownText?: string) {
        if (children) {
            this.children = new ChildArray(this, children);
        }
    }

    get text(): string {
        return this.ownText || this.children.array.reduce((previous, current) => previous + current.text, "");
    }

    is(...identities: string[]) {
        const arr = this.identities.array;
        for (const identity of identities) {
            if (!includes(arr, identity)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Transforms each child. Isn't applied to nested children, but you can easily call
     * child.transform(...). Since Dremes are immutable, they are not modified.
     * @param transformer The transformation function (current: Dreme, next: Dreme) => Dreme | Nightmare
     */
    transform(transformer: DremeTransformer): Dreme {
        const oldDremes: Dreme[] = this.children.array;
        const newDremes: Dreme[] = [];

        let currentNewDreme;
        for (let i = 0; i < oldDremes.length; i++) {
            const currentOldDreme = oldDremes[i];
    
            if (!currentNewDreme) {
                currentNewDreme = new Dreme();
            }
            const next = transformer(currentNewDreme, currentOldDreme)
    
            if (next === Nightmare.END_OF_DREME || next === Nightmare.INCLUDE_AND_END || next === Nightmare.CONSUME_AND_END) {
                if (next === Nightmare.INCLUDE_AND_END) {
                    currentNewDreme = currentNewDreme.children.add(currentOldDreme);
                } else if (next == Nightmare.END_OF_DREME) {
                    i--
                }

                newDremes.push(currentNewDreme);
                currentNewDreme = undefined;
            }
        }
        if (currentNewDreme) {
            newDremes.push(currentNewDreme);
        }
    
        return new Dreme(newDremes);
    }

    apply (applier: DremeApplier) {
        return applier(this);
    }

    filterChildren(filter: (dreme: Dreme) => boolean) {
        return new Dreme(this.children.array.filter(filter));
    }
    
    static from(string: string) {
        const dremes = [];

        for (const char of string) {
            dremes.push(new Dreme([], char));
        }

        return new Dreme(dremes);
    }
}




