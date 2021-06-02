"use strict"

const fs = require("fs")
const http = require("http")
const path = require("path")
const { MIME_TYPES, UNKNOWN_CONTENT_TYPE } = require("./.storage.json")

const getContentType = (ext) => {
    const contentType = MIME_TYPES[ext] || UNKNOWN_CONTENT_TYPE
    return contentType + "; charset=utf-8"
}

const Response = class extends http.ServerResponse {
    respondFile(pathname) {
        if (pathname.split("/").some(x => x.startsWith(".")))
            return this.missing(pathname)
        let data
        const absPath = path.join(__dirname, pathname)
        try {
            data = fs.readFileSync(absPath)
        } catch (err) {
            if (err.code === "ENOENT")
                return this.missing(pathname)
            return this.error(err)
        }
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
    error(err) {
        console.error(err)
        this.writeHead(500, { "Content-Type": getContentType(".txt") })
        this.write(`500 INTERNAL ERROR: ${err}`)
        return this.end()
    }
    redirect(url) {
        this.writeHead(301, { "Location": url })
        return this.end()
    }
}

module.exports = Response