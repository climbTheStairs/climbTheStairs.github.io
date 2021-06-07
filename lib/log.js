"use strict"

const fsp = require("fs").promises
const Tor = require("./tor.js")

const Log = {
    createEntry(req) {
        const { headers, method, url } = req
        const ts = new Date().toISOString()
        let ip = req.getIp()
        if (Tor.check(ip))
            ip += " (tor)"
        const target = `${method} ${url}`
        const ua = "User-Agent: " + headers["user-agent"]
        const dnt = "DNT: " + headers.dnt
        return [ts, ip, target, ua, dnt].join(" | ")
    },
    getDate() {
        const d = new Date()
        const yyyy = d.getFullYear().toString()
        const mm = (d.getMonth() + 1).toString().padStart(2, "0")
        const dd = d.getDate().toString().padStart(2, "0")
        return yyyy + mm + dd
    },
    getProtocol(req) {
        if (req.isOnion())
            return "tor"
        if (req.socket.encrypted)
            return "https"
        return "http"
    },
    logErr(err) {
        console.error(err)
        const loc = __dirname + `/../logs/err_${Log.getDate()}.jsonl`
        fsp.appendFile(loc, JSON.stringify(err) + "\n")
    },
    logReq(req) {
        const entry = Log.createEntry(req)
        console.log(entry)
        const protocol = Log.getProtocol(req)
        const date = Log.getDate(req)
        const loc = __dirname + `/../logs/${protocol}_${date}.txt`
        fsp.appendFile(loc, entry + "\n")
    },
}

module.exports = Log