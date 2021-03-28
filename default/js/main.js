;(() => {
    "use strict"
    const global = {
        $: document.querySelector.bind(document),
        $$: document.querySelectorAll.bind(document),
        $id: document.getElementById.bind(document),
        $root: document.documentElement,
        $head: document.head || document,
        $body: document.body || document,
        create(tag, ...props) {
            const $el = document.createElement(tag)
            Object.assign($el, ...props)
            return $el
        },
    }
    const elProto = {
        $: Element.prototype.querySelector,
        $$: Element.prototype.querySelectorAll,
        css(props) {
            Object.assign(this.style, props)
            return this
        },
        fade(cb, dur = 500) {
            this.css({
                transition: `opacity ${dur}ms`,
                opacity: 0,
            })
            setTimeout(() => {
                cb()
                this.css({ opacity: "" })
                setTimeout(() => this.css({ opacity: "" }), dur)
            }, dur)
            return this
        },
    }
    const stairz = {
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
        getRandStr(length = 50, charTypes = "luns") {
            let chars = ""
            const allChars = stairz.createMap({
                l: "abcdefghijklmnopqrstuvwxyz",
                u: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                n: "0123456789",
                s: "!@#$%^&*()-=_+,.",
            })
            for (const charType of charTypes)
                chars += allChars.get(charType)
            
            const res = []
            while (length --> 0)
                res.push(chars[~~(Math.random() * chars.length)])
            return res.join("")
        },
    }
    Object.assign(window, global, { stairz })
    Object.assign(Element.prototype, elProto)
})()
