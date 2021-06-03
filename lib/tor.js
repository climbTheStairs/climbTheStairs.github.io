"use strict"

const fs = require("fs")
const fsp = fs.promises
const https = require("https")
const path = require("path")

const EXIT_NODES_URL = "https://check.torproject.org/torbulkexitlist"

const Tor = {
    downloadExitNodes() {
        const loc = path.join(__dirname, "/tor_exit_nodes.txt")
        const file = fs.createWriteStream(loc)
        https.get(EXIT_NODES_URL, (res) => {
            const status = res.statusCode
            if (status !== 200) {
                console.error(`[ERR] Downloading Tor exit nodes failed with status ${status}!`)
                res.resume()
            }
            res.pipe(file)
            console.log("[INFO] Downloaded Tor exit nodes!")
        })
    },
    async getExitNodes() {
        const loc = path.join(__dirname, "/tor_exit_nodes.txt")
        const data = await fsp.readFile(loc, "utf-8").catch(() => "")
        return data.trim().split("\n")
    },
    async check(ip) {
        const exitNodes = await this.getExitNodes()
        return exitNodes.includes(ip)
    },
}

Tor.downloadExitNodes()
setInterval(Tor.downloadExitNodes.bind(Tor), 24 * 60 * 60 * 1000)

module.exports = Tor