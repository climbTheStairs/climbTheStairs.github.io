// NODE DOT JAY ESSSS TESTING - Hello cruel world!
// TODO: Query strings, cookies

"use strict"

const fs = require("fs")
const http = require("http")
const https = require("https")
const path = require("path")
const url = require("url")
const IncomingMessage = require("./incoming_message.js")
const ServerResponse = require("./server_response.js")
const { logReq } = require("./log.js")

const blacklistLoc = __dirname + "/../etc/blacklist.txt"
const blacklist = fs.readFileSync(blacklistLoc, "utf-8").trim().split("\n")
const certLoc = "C:/Certbot/live/climbthestairs.org"
const cert = fs.readFileSync(certLoc + "/fullchain.pem", "utf-8")
const key = fs.readFileSync(certLoc + "/privkey.pem", "utf-8")

const options = { IncomingMessage, ServerResponse }
const secureOptions = { ...options, cert, key }

const rescue = (req, res) => {
    logReq(req)
    res.redirect("https://" + req.headers.host + req.url)
}
const respond = (req, res) => {
    logReq(req)
    if (blacklist.includes(req.getIp()))
        return res.err({ code: "Blocked" })
    if (!req.isOnion())
        res.setOnionLocation(req.url)
    let { pathname } = url.parse(req.url)
    if (pathname === "/")
        pathname = "/home"
    if (pathname.endsWith("/"))
        pathname = pathname.slice(0, -1)
    if (path.extname(pathname) === "")
        pathname += ".html"
    if (pathname === "/favicon.ico")
        return res.redirect("/img/demonic_object.svg")
    return res.respondFile(pathname)
}

const server = http.createServer(options, rescue)
server.listen(8080, () => console.log("[START] Hello there, world!"))

const secureServer = https.createServer(secureOptions, respond)
secureServer.listen(8888, () => console.log("[START] General Kenobi!"))

const onionServer = http.createServer(options, respond)
onionServer.listen(9999, () => console.log("[START] You are an onion!"))