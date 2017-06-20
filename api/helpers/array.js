/**
 * Adds useful methods to the Array class.
 */

/**
 * Sorts and returns the array.
 *
 * @param  {Function} orderBy
 * @return {Array}
 */
Array.prototype.ordered = function(orderBy) {
    this.sort(orderBy)
    return this
}

if (undefined == Array.prototype.contains) {
    /**
     * Returns `true` if the array contains
     * the `item`; `false` otherwise.
     *
     * @param  {*} item
     * @return {Boolean}
     */
    Array.prototype.contains = function(item) {
        return -1 != this.indexOf(item)
    }
}
