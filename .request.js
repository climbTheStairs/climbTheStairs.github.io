"use strict"

const http = require("http")

const Request = class extends http.IncomingMessage {
    getIp() {
        // https://stackoverflow.com/a/19524949/9281985
        const ips = []
        const xForwardedFor = this.headers['x-forwarded-for']
        const { remoteAddress } = this.socket
        if (typeof xForwardedFor === "string" && xForwardedFor !== "")
            ips.push(...xForwardedFor.split(","))
        if (typeof remoteAddress === "string")
            ips.push(remoteAddress)
        for (let i = 0, l = ips.length; i < l; i++)
            if (ips[i].startsWith("::ffff:"))
                ips[i] = ips[i].slice(7)
        return ips.join(",")
    }
}

module.exports = Request