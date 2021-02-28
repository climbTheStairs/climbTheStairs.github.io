"use strict"
;(() => {
    window.$ = document.querySelector.bind(document)
    window.$$ = document.querySelectorAll.bind(document)
    window.$id = document.getElementById.bind(document)
    window.$head = document.head || document
    window.$body = document.body || document
    window.create = (tag, ...props) => {
        const $el = document.createElement(tag)
        Object.assign($el, ...props)
        return $el
    }
    Element.prototype.$ = Element.prototype.querySelector
    Element.prototype.$$ = Element.prototype.querySelectorAll
    Element.prototype.CSS = function(props) {
        Object.assign(this.style, props)
        return this
    }
    Element.prototype.fade = function(cb, dur = 500) {
        this.CSS({
            transition: `opacity ${speed}ms`,
            opacity: 0,
        })
        setTimeout(() => {
            cb()
            this.CSS({ opacity: "" })
            setTimeout(() => this.CSS({ opacity: "" }), dur)
        }, dur)
        return this
    }
    window.stairz = {
        copy(value) {
            const $tmp = create("textarea", { value })
            $body.append($tmp)
            $tmp.select()
            document.execCommand("copy")
            $tmp.remove()
        },
        createDataResource(contentType, val) {
            const resource = `data:${contentType};base64,${btoa(val)}`
            return resource
        },
        createMap(obj) {
            const iter = Object.entries(obj)
            const map = new Map(iter)
            return map
        },
        dl(href, download = "go_drink_water_and_do_hwk") {
            const $a = create("a", { href, download })
            $a.click()
        },
        getRandStr(length = 50, charTypes = "") {
            let chars = ""
            const allChars = stairz.createMap({
                l: "abcdefghijklmnopqrstuvwxyz",
                u: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                n: "0123456789",
                s: "!@#$%^&*()-=_+,.",
            })
            for (const charType of charTypes)
                chars += allChars.get(charType)
            chars ||= [...allChars.values()].join("")
            
            const res = []
            while (length --> 0)
                res.push(chars[~~(Math.random() * chars.length)])
            return res.join("")
        },
    }
})()
