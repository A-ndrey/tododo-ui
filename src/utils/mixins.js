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

String.prototype.htmlLinks = function () {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const taskRegex = /{{\s*([Tt][Aa][Ss][Kk]#(\d+))\s*}}/g
    const lfRegex = /(?:\r\n|\r|\n)/g

    return this
        .replace(urlRegex, '<a href="$1">$1</a>')
        .replace(taskRegex, `<a href="${window.location.origin}/tasks/$2">$1</a>`)
        .replace(lfRegex, '<br>')
}