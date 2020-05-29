export function includes<T>(array: T[], item: T) {
    for (let element of array) {
        if (element === item) {
            return true;
        }
    }

    return false;
}