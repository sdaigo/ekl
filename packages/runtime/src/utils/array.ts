/**
 * Array utilities
 */

/**
 * Removes null values from an array.
 *
 * @template T The type of elements in the array.
 * @param {T[]} arr The input array.
 * @returns {T[]} A new array without null values.
 */
export function withoutNulls<T>(arr: T[]): T[] {
  return arr.filter(item => item != null);
}
