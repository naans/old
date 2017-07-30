import {plural} from 'pluralize'
import {errors} from './notifiers'
import {get, post, put, remove} from './request'

class Collection {

    constructor(name) {
        this.name  = name
        this.route = plural(name)
        this.items = null
        this.index = {}
    }

    load() {
        return get(this.route, {})
            .then(items => {
                this.items = items
                this.index = items.reduce((result, item) => {
                    result[item.id] = item
                    return result
                }, {})
                return this.items
            })
            .catch(console.error)
    }

    all() {
        return (null == this.items)
            ? this.load()
            : Promise.resolve(this.items)
    }

    add(data) {
        return post(this.route, {
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)}
        ).then(result => {
            if (this.items == null)
                this.items = []
            this.items.push(result)
            this.index[result.id] = result
            return result
        })
    }

    save(id, data) {
        return put(`${this.route}/${id}`, {
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)}
        ).then(() => this.load())
    }

    remove(id) {
        return remove(`${this.route}/${id}`, {})
            .then(() => this.load())
    }

    at(id) {
        return (undefined == this.index[id])
            ? this.get(id)
            : Promise.resolve(this.index[id])
    }

    get(id) {
        return get(`${this.route}/${id}`, {})
    }

}

export const categories = new Collection('category')
export const meals = new Collection('meal')
export const pictures = new Collection('picture')

export default {categories, meals}
