
export function indexAtMod<T>(arr: T[]) {
    return (n: number) => arr.at(n % arr.length);
}
