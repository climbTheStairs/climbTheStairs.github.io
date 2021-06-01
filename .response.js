"use strict"

const fs = require("fs")
const http = require("http")
const path = require("path")

const FS_OPTIONS = {
    encoding: "utf-8",
    flag: "r",
}
const MIME_TYPES = {
    ".css": "text/css",
    ".html": "text/html",
//  ".ico": "image/x-icon",
    ".js": "text/javascript",
    ".svg": "image/svg+xml",
    ".ttf": "font/ttf",
    ".txt": "text/plain",
}
const DEFAULT_CONTENT_TYPE = "application/octet-stream"

const getContentType = (ext) => {
    const contentType = MIME_TYPES[ext] || DEFAULT_CONTENT_TYPE
    return contentType + "; charset=utf-8"
}

const Response = class extends http.ServerResponse {
    respondPage(pathname) {
        if (pathname.endsWith("/"))
            pathname += "index"
        return this.respondFile(pathname + ".html")
    }
    respondFile(pathname) {
        if (pathname.split("/").some(x => x.startsWith(".")))
            return this.missing(pathname)
        let data
        const absPath = path.join(__dirname, pathname)
        try {
            data = fs.readFileSync(absPath, FS_OPTIONS)
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