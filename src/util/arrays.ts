export function includes(array: any[], item: any) {
    for (let element of array) {
        if (element === item) {
            return true;
        }
    }
    
    return false;
}