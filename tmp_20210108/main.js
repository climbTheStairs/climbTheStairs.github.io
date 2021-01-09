;(() => {
    "use strict"

    String.prototype.shift = function(i) {
        i += 1
        return this.slice(i) + this.slice(0, i)
    }
    
    const a = $("#str-a").value
    const b = $("#str-b").value

    for (let i = 0, l = a.length; i < l; i++)
        if (a.shift(i) === b)
            return true
    return false
})()
