"use strict"

const fsp = require("fs").promises
const path = require("path")
const Tor = require("./tor.js")

const Log = {
    getDate() {
        const d = new Date()
        const yyyy = d.getFullYear().toString()
        const mm = (d.getMonth() + 1).toString().padStart(2, "0")
        const dd = d.getDate().toString().padStart(2, "0")
        return yyyy + mm + dd
    },
    logErr(err) {
        console.error(err)
        const fileName = `/../logs/err_${Log.getDate()}.jsonl`
        const loc = path.join(__dirname, fileName)
        fsp.appendFile(loc, JSON.stringify(content) + "\n")
    },
    async logReq(req) {
        const { headers, method, socket, url } = req
        const ts = new Date().toISOString()
        let ip = req.getIp()
        if (await Tor.check(ip))
            ip += " (tor)"
        const target = `${method} ${url}`
        const ua = "User-Agent: " + headers["user-agent"]
        const { dnt } = headers
        const entry = [ts, ip, target, ua, dnt].join(" | ")
        console.log(entry)
        let fileName = "/../logs"
        if (req.isTor())
            fileName += `/tor_${Log.getDate()}.txt`
        else if (socket.encrypted)
            fileName += `/https_${Log.getDate()}.txt`
        else
            fileName += `/http_${Log.getDate()}.txt`
        const loc = path.join(__dirname, fileName)
        fsp.appendFile(loc, entry + "\n")
    },
}

module.exports = Log