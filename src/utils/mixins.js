Array.prototype.replace = function (condition, value) {
    return this.map(val => {
        if (condition(val)) {
            return value
        }
        return val
    })
}

Array.prototype.objCopy = function () {
    return this.map(val => Object.assign({}, val))
}