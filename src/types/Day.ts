/** Object that represents a Day of the year.
 * It's `month` property is evaluated as 1-based indexed.
 * JS Date's `month` is 0-based indexed
 */
export interface Day {
    year: number;
    month: number;
    day: number;
}
