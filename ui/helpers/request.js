import R from 'ramda'

const apiURL = 'http://localhost:3000/api'

export const request = R.curry((method, route, opts) =>
    fetch(`${apiURL}/${route}`, R.merge(opts, {method}))
    .then(res => Promise.all([Promise.resolve(res.ok), res.json()]))
    .then(pair => pair[0] ? pair[1] : Promise.reject(pair[1].error)))

export const get  = request('GET')
export const post = request('POST')
export const put  = request('PUT')
export const remove = request('DELETE')

