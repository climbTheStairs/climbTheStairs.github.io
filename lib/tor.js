"use strict"

const request = require("./request.js")
const stringifyStream = require("./stringify_stream.js")

const Tor = {
    exitNodes: "",
    init() {
        Tor.downloadExitNodes()
        setInterval(Tor.downloadExitNodes, 24 * 60 * 60 * 1000)
    },
    async downloadExitNodes() {
        const url = "https://check.torproject.org/torbulkexitlist"
        const res = await request(url).catch((res) => {
            const { statusCode } = res
            console.error(`[ERR] Downloading Tor exit nodes failed with status ${statusCode}!`)
            return res.resume()
        })
        Tor.exitNodes = await stringifyStream(res)
        console.log("[INFO] Downloaded Tor exit nodes!")
    },
    check(ip) {
        return Tor.exitNodes.includes(ip)
    },
}

Tor.init()

module.exports = Tor