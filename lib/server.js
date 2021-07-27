// NODE DOT JAY ESSSS TESTING - Hello cruel world!
// TODO: Query strings, cookies
// TODO: nginx logging, remove nginx server header

"use strict"

const fs = require("fs")
const http = require("http")
const path = require("path")
const url = require("url")
const IncomingMessage = require("./incoming_message")
const ServerResponse = require("./server_response")
const { logReq } = require("./log")

const blacklistLoc = __dirname + "/../etc/blacklist.txt"
const blacklist = fs.readFileSync(blacklistLoc, "utf-8").trim().split("\n")

const options = { IncomingMessage, ServerResponse }

const respond = (req, res) => {
    logReq(req)
    if (blacklist.includes(req.getIp()))
        return res.err(403, "Your IP address has been blacklisted. If you believe this is a mistake, please contact me.")
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

const server = http.createServer(options, respond)
server.listen(8080, () => console.log("[START] Hello there, world!"))

const onionServer = http.createServer(options, respond)
onionServer.listen(9999, () => console.log("[START] You are an onion!"))

