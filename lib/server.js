// NODE DOT JAY ESSSS TESTING - Hello cruel world!
// TODO: Query strings
// TODO: Cookies

"use strict"

const fs = require("fs")
const http = require("http")
const https = require("https")
const path = require("path")
const url = require("url")
const Log = require("./log.js")
const IncomingMessage = require("./incoming_message.js")
const ServerResponse = require("./server_response.js")

const CERT_DIR = "C:/Certbot/live/climbthestairs.org/"
const ONION = "ggrs5emm6nbeuz45phjftfqf36tc3n423tnjgrxpnuce56fyf2mt2wyd.onion"

const getFromCertDir = (f) => {
    const filePath = path.join(CERT_DIR, f)
    const data = fs.readFileSync(filePath)
    return data
}
const cert = getFromCertDir("fullchain.pem")
const key = getFromCertDir("privkey.pem")

const options = { IncomingMessage, ServerResponse }
const secureOptions = { ...options, cert, key }

const rescue = (req, res) => {
    res.redirect("https://" + req.headers.host + req.url)
    Log.logReq(req, res)
}
const respond = (req, res) => {
    let { pathname } = url.parse(req.url)
    if (pathname === "/")
        pathname = "/home"
    if (pathname.endsWith("/"))
        pathname = pathname.slice(0, -1)
    if (pathname === "/favicon.ico")
        pathname = "/default/img/demonic_object.svg"
    if (path.extname(pathname) === "")
        pathname += ".html"
    res.setHeader("Onion-Location", "http://" + ONION + req.url)
    res.respondFile(pathname)
    Log.logReq(req, res)
}

const server = http.createServer(options, rescue)
server.listen(8080, () => console.log("[START] Hello there, world!"))

const secureServer = https.createServer(secureOptions, respond)
secureServer.listen(8888, () => console.log("[START] General Kenobi!"))

const onionServer = http.createServer(options, respond)
onionServer.listen(9999, () => console.log("[START] You are an onion!"))