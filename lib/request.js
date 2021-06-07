"use strict"

const https = require("https")

const CONTENT_TYPE = "application/x-www-form-urlencoded; charset=utf-8"
const USER_AGENT = (
    "User-Agent: Mozilla/5.0 (Windows NT 10.0; rv:78.0) "+
    "Gecko/20100101 Firefox/78.0"
)
// Simple, recursive `Object.assign()`
const simpAss = (target, ...sources) => {
    const assToTarget = ([key, val]) => {
        if (typeof target[key] === "object" && typeof val === "object")
            return simpAss(target[key], val)
        return target[key] = val
    }
    for (const source of sources)
        Object.entries(source).forEach(assToTarget)
    return target
}
const getOptions = (options, body) => {
    const defaultOptions = {
        method: "GET",
        headers: {
            DNT: 1,
            "User-Agent": USER_AGENT,
        },
    }
    const defaultPostOptions = {
        method: "POST",
        headers: {
            "Content-Length": Buffer.byteLength(body || ""),
            "Content-Type": CONTENT_TYPE,
        },
    }
    if (typeof body !== "undefined")
        simpAss(defaultOptions, defaultPostOptions)
    return simpAss(defaultOptions, options)
}
const request = (url, options = {}, body) => {
    options = getOptions(options, body)
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            if (res.statusCode !== 200)
                return reject(res)
            return resolve(res)
        })
        if (typeof body !== "undefined")
            req.write(body)
        req.end()
    })
}

module.exports = request