"use strict"

const fs = require("fs")
const http = require("http")
// const https = require("https")
const path = require("path")
const url = require("url")

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

http.IncomingMessage.prototype.getIp = function() {
    // https://stackoverflow.com/a/19524949/9281985
    const ips = []
    const xForwardedFor = this.headers['x-forwarded-for']
    const { remoteAddress } = this.socket
    if (typeof xForwardedFor === "string" && xFowardedFor !== "")
        ips.push(...xForwardedFor.split(","))
    if (typeof remoteAddress === "string")
        ips.push(remoteAddress)
    for (let i = 0, l = ips.length; i < l; i++)
        if (ips[i].startsWith("::ffff:"))
            ips[i] = ips[i].slice(7)
    return ips.join(",")
}
http.ServerResponse.prototype.respondPage = function(pathname) {
    if (pathname.endsWith("/"))
        pathname += "index"
    return this.respondFile(pathname + ".html")
}
http.ServerResponse.prototype.respondFile = function(pathname) {
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
http.ServerResponse.prototype.missing = function(pathname) {
    this.writeHead(404, { "Content-Type": getContentType(".txt") })
    this.write(`404 NOT FOUND: ${pathname}`)
    return this.end()
}
http.ServerResponse.prototype.error = function(err) {
    console.error(err)
    this.writeHead(500, { "Content-Type": getContentType(".txt") })
    this.write(`500 INTERNAL ERROR: ${err}`)
    return this.end()
}
http.ServerResponse.prototype.redirect = function(url) {
    this.writeHead(302, { "Location": url })
    return this.end()
}

const respond = (req, res) => {
    const { pathname } = url.parse(req.url)
    console.log(`GET ${pathname}`)
    console.log(`IP: ${req.getIp()}`)
    if (path.extname(pathname) === "")
        return res.respondPage(pathname)
    if (pathname === "/favicon.ico")
        return res.respondFile("/default/icons/demonic_object.svg")
    return res.respondFile(pathname)
}

const certDir = "C:/Certbot/live/site.climbthestairs.org/"
const key = fs.readFileSync(path.join(certDir, "privkey.pem"))
const cert = fs.readFileSync(path.join(certDir, "fullchain.pem"))

const server = http.createServer({ key, cert }, respond)
const onReady = () => console.log("Hello there, world!")
server.listen(8888, onReady)