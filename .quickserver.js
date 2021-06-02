// NODE DOT JAY ESSSS TESTING - Hello cruel world!
// TODO: Query strings
// TODO: Headers and cookies

"use strict"

const fs = require("fs")
const http = require("http")
const https = require("https")
const path = require("path")
const url = require("url")
const IncomingMessage = require("./.request.js")
const ServerResponse = require("./.response.js")

const getFromCertDir = (f) => {
    const certDir = "C:/Certbot/live/climbthestairs.org/"
    const filePath = path.join(certDir, f)
    const data = fs.readFileSync(filePath)
    return data
}
const cert = getFromCertDir("fullchain.pem")
const key = getFromCertDir("privkey.pem")

const options = { IncomingMessage, ServerResponse }
const secureOptions = { ...options, cert, key }

const rescue = (req, res) => {
    const { host } = req.headers
    const { pathname } = url.parse(req.url)
    console.log(`${req.getIp()} | 301 ${host + pathname}`)
    res.redirect("https://" + req.headers.host + req.url)
    return res.end()
}
const respond = (req, res) => {
    const { host } = req.headers
    let { pathname } = url.parse(req.url)
    console.log(`${req.getIp()} | GET ${host + pathname}`)
    if (pathname === "/")
        pathname = "/index"
    if (pathname.endsWith("/"))
        pathname = pathname.slice(0, -1)
    if (pathname === "/favicon.ico")
        pathname = "/default/icons/demonic_object.svg"
    if (path.extname(pathname) === "")
        pathname += ".html"
    return res.respondFile(pathname)
}

const server = http.createServer(options, rescue)
server.listen(8080, () => console.log("Hello there, world!"))

const secureServer = https.createServer(secureOptions, respond)
secureServer.listen(8888, () => console.log("General Kenobi!"))

const onionServer = http.createServer(options, respond)
onionServer.listen(9999, () => console.log("You are an onion!"))