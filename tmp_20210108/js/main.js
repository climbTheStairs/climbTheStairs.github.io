;(() => {
    "use strict"

    String.prototype.shift = function(i) {
        i += 1
        return this.slice(i) + this.slice(0, i)
    }

    const $strA = $("#str-a")
    const $strB = $("#str-b")
    
    const isShiftable = () => {
        const a = $strA.value
        const b = $strB.value
        
        if (a === b)
            return true
        
        for (let i = 0, l = a.length; i < l; i++)
            if (a.shift(i) === b)
                return true
        
        return false
    }
    
    $("#go").onclick = () => window.alert(isShiftable())
})()
