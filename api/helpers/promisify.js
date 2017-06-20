/**
 * Converts an asynchromous function `f` which accepts a callback
 * to a function `g` which returns a Promise. The callback should
 * be the last argument of `f` with signature callback(err, data)
 *
 * @param  {Function} fn
 * @return {Function}
 */
const promisify = fn => (...args) => {
    const callback = (resolve, reject) => {
        return (err, data) => {
            if (err)
                return reject(err)
            return resolve(data)
        }
    }

    return new Promise((resolve, reject) => fn(...args, callback(resolve, reject)))
}

module.exports = promisify
