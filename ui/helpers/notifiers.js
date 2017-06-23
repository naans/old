class Collection {
    constructor() {
        this.items = []
        this.subscribers = []
        this.remove = this.remove.bind(this)
    }
    all() {
        return this.items
    }
    add(item) {
        this.items.push(item)
        this.changed()
    }
    remove(index) {
        this.items.splice(index, 1)
        this.changed()
    }
    clear() {
        this.items = []
        this.changed()
    }
    subscribe(callback) {
        const index = this.subscribers.length
        this.subscribers.push(callback)
        return index
    }
    unsubscribe(index) {
        this.subscribers[index] = null
    }
    changed() {
        this.subscribers
            .filter(callback => null != callback)
            .forEach(callback => callback(this.items))
    }
}

export const errors = new Collection
export const infos  = new Collection

export default {errors, infos}
