import { Transformer } from "./types/transformer";
import { Dreme } from ".";

test("Testing transformer", () => {
    const tokenizeStrings: Transformer = (current, next, actions) => {
        if (current.is("string")) {
            if (current.is("nextEscaped")) {
                return actions.add(next);
            } else if (next.text === "\\") {
                return current.identities.add("nextEscaped");
            } else if (next.text === '"') {
                return actions.end();
            } else {
                return current.children.add(next);
            }
        } else if (current.is("code")) {
            if (next.text === '"') {
                return Nightmare.END_OF_DREME;
            } else {
                return current.children.add(next);
            }
        } else {
            if (next.text === '"') {
                return current.identities.add("string");
            } else {
                return current.identities.add("code").children.add(next);
            }
        }
    }

    const strings = [" Sweet dremes ", 'Sleep tight!', " "];
    const [ s1, s2, s3 ] = strings;

    const testDreme = Dreme.from(strings.join('"')).transform(tokenizeStrings);

    expect(testDreme.children.array[0].text).toEqual(s1);
    expect(testDreme.children.array[1].text).toEqual(s2);
    expect(testDreme.children.array[2].text).toEqual(s3);

    console.log(testDreme.children.array.map(child => ({...child, text: child.text, identities: child.identities.array})));
})