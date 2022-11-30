/** Converts from milliseconds to days */
export function fromMiliSecondsToDay(milliseconds: number): number {
    return Math.floor(milliseconds / (1000 * 60 * 60 * 24));
}
