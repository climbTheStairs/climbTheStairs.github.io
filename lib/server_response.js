"use strict"

const fs = require("fs")
const fsp = fs.promises
const http = require("http")
const path = require("path")
const { logErr } = require("./log.js")
const contentTypes = require("../etc/content_types.json")

const torHostnameLoc = __dirname + "/../etc/tor/hostname"
const torHostname = fs.readFileSync(torHostnameLoc, "utf-8").trim()
const getContentType = (ext) => {
    const UNKNOWN_CONTENT_TYPE = "application/octet-stream"
    const contentType = contentTypes[ext] || UNKNOWN_CONTENT_TYPE
    return contentType + "; charset=utf-8"
}

const ServerResponse = class extends http.ServerResponse {
    async respondFile(pathname) {
        const absPath = __dirname + "/../srv" + pathname
        const data = await fsp.readFile(absPath).catch((err) => {
            if (err.code !== "ENOENT")
                return this.err(err)
            return this.missing(pathname)
        })
        if (data === this)
            return this
        const ext = path.extname(pathname)
        this.writeHead(200, { "Content-Type": getContentType(ext) })
        this.write(data)
        return this.end()
    }
    missing(pathname) {
        this.writeHead(404, { "Content-Type": getContentType(".txt") })
        this.write(`404 NOT FOUND: ${pathname}`)
        return this.end()
    }
    err(err) {
        logErr(err)
        this.writeHead(500, { "Content-Type": getContentType(".txt") })
        this.write(`500 INTERNAL ERROR: ${err.code}`)
        return this.end()
    }
    redirect(url) {
        this.writeHead(301, { Location: url })
        return this.end()
    }
    setOnionLocation(url) {
        this.setHeader("Onion-Location", "http://" + torHostname + url)
    }
}

module.exports = ServerResponse