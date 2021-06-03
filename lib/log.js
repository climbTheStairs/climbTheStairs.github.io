"use strict"

const fsp = require("fs").promises
const path = require("path")
const Tor = require("./tor.js")

const Log = {
    async appendJson(loc, content) {
        const data = JSON.parse(
            await fsp.readFile(loc, "utf-8").catch(err => "[]")
        )
        data.push(content)
        fsp.writeFile(loc, JSON.stringify(data))
    },
    getDate() {
        const d = new Date()
        const yyyy = d.getFullYear().toString()
        const mm = (d.getMonth() + 1).toString().padStart(2, "0")
        const dd = d.getDate().toString().padStart(2, "0")
        return yyyy + mm + dd
    },
    logErr(err) {
        const loc = path.join(__dirname, `/../logs/err/${this.getDate()}.json`)
        this.appendJson(loc, err)
        console.error(err)
    },
    async logReq(req, res) {
        const loc = path.join(__dirname, `/../logs/req/${this.getDate()}.json`)
        const { headers, method } = req
        const status = res.statusCode
        const ip = req.getIp()
        const ts = new Date().toISOString()
        const url = method + " " + req.getFullUrl()
        const ua = "User-Agent: " + headers["user-agent"]
        const dnt = headers.dnt
        const tor = await Tor.check(ip)
        const entry = { ip, ts, url, status, ua, dnt, tor }
        this.appendJson(loc, entry)
        console.log(entry)
    },
}

module.exports = Log