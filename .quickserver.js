// NODE DOT JAY ESSSS TESTING - Hello cruel world!
// TODO: Query strings
// TODO: Headers and cookies

"use strict"

const fs = require("fs")
const http = require("http")
const https = require("https")
const path = require("path")
const url = require("url")
const { FS_OPTIONS } = require("./.storage.json")
const IncomingMessage = require("./.request.js")
const ServerResponse = require("./.response.js")

const getFromCertDir = (f) => {
    const certDir = "C:/Certbot/live/climbthestairs.org/"
    const data = fs.readFileSync(path.join(certDir, f), FS_OPTIONS)
    return data
}
const cert = getFromCertDir("fullchain.pem")
const key = getFromCertDir("privkey.pem")

const options = { IncomingMessage, ServerResponse }
const secureOptions = { ...options, cert, key }

const rescue = (req, res) => {
    console.log(`${req.getIp()} | 301 ${req.url}`)
    res.redirect("https://" + req.headers.host + req.url)
    return res.end()
}
const respond = (req, res) => {
    const { pathname } = url.parse(req.url)
    const { host } = req.headers
    console.log(`${req.getIp()} | GET ${host + pathname}`)
    if (pathname === "/favicon.ico")
        return res.respondFile("/default/icons/demonic_object.svg")
    if (path.extname(pathname) === "")
        return res.respondPage(pathname)
    return res.respondFile(pathname)
}

const server = http.createServer(options, rescue)
server.listen(8080, () => console.log("Hello there, world!"))

const secureServer = https.createServer(secureOptions, respond)
secureServer.listen(8888, () => console.log("General Kenobi!"))

const onionServer = http.createServer(options, respond)
onionServer.listen(9999, () => console.log("You are an onion!"))