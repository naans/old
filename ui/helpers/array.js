import R from 'ramda'

if (undefined === Array.prototype.where) {
    Array.prototype.where = function(conditions) {
        return this.filter(item => {
            for(var attr in conditions) {
                const cond = conditions[attr]
                if (undefined === item[attr])
                    return false
                if (R.type(cond) == 'Function' && !cond(item[attr]))
                    return false
                else if (item[attr] != cond)
                    return false
            }
            return true
        })
    }
}

if (undefined === Array.prototype.pick) {
    Array.prototype.pick = function(fields) {
        return this.map(R.pick(fields))
    }
}

if (undefined === Array.prototype.valuesOf) {
    Array.prototype.valuesOf = function(field) {
        return this.map(R.prop(field))
    }
}

