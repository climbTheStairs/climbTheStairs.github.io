// Warning: Order of properties is not guaranteed!
// https://stackoverflow.com/a/38218582
;(() => {
    "use strict"
    
    const ERR = {
        badProps: "data[${i}] contains different properties",
        badType: "data[${i}] contains bad datatype \"${type}\"",
        empty: "data is empty",
        notArray: "data is not an array",
    }
    
    const jsonToCsv = (data, fName = "data") => {
        if (!Array.isArray(data))
            throw new TypeError(ERR.notArray)
        if (!data.length)
            throw new TypeError(ERR.empty)
        const keys = Object.keys(data[0])
        for (let i = 1, l = data.length; i < l; i++)
            if (!Object.keys(data[i]).equals(keys))
                throw new TypeError(stairz.subst(ERR.badProps, { i }))

        const stringify = (val, i) => {
            const type = typeof val
            if (val === null)
                return ""
            if (["boolean", "number"].includes(type))
                return val.toString()
            if (type !== "string")
                throw new TypeError(stairz.susbst(ERR.badType, { i, type }))
            if ([",", "\n", `""`].some(x => val.includes(x)))
                return `"${val.replace(/"/g, `""`)}"`
            return val
        }
        // Object.keys() and Object.values() return values in fixed order?
        const csv = [keys, ...data.map(Object.values)]
            .map(line => line.map(stringify).join(","))
            .join("\n")
        
        const mimeType = "text/csv;charset=UTF-8;header=present"
        const resource = stairz.createDataResource(mimeType, csv)
        stairz.dl(resource, fName)
    }
    
    window.stairz.jsonToCsv = jsonToCsv
})();