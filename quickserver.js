"use strict"

const fs = require("fs")
const http = require("http")
const url = require("url")
const path = require("path")

const mimeTypes = {
    ".css": "text/css",
    ".html": "text/html",
    ".ico": "image/x-icon",
    ".js": "text/javascript",
}
const respond = (req, res) => {
    let { pathname } = url.parse(req.url)
    if (pathname === "/")
        pathname += "index.html"
    const reqPath = path.join(__dirname, pathname)
    const ext = reqPath.slice(reqPath.lastIndexOf("."))
    const type = mimeTypes[ext] || "text/html"
    res.setHeader("Content-Type", type)
    /*
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(404)
            return console.error(err)
        }
        res.writeHead(200)
        res.write(data)
    })
    //*/
    try {
        const data = fs.readFileSync(reqPath)
        res.writeHead(200)
        res.write(data)
    } catch (err) {
        res.writeHead(404)
        console.error(err)
    }
    res.end()
}
const onReady = () => console.log("Ready!")

http.createServer(respond).listen(8888, onReady)