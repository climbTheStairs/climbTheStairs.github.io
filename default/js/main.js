;(() => {
    "use strict"
    const $ = document.querySelector.bind(document)
    const $$ = document.querySelectorAll.bind(document)
    const $head = document.head || document
    const $body = document.body || document
    const $create = (tag, ...props) => {
        const $el = document.createElement(tag)
        Object.assign($el, ...props)
        return $el
    }
    const arrProto = {
        equals(arr) {
            if (!Array.isArray(arr))
                throw new TypeError("arg must be of type array")
            if (this.length !== arr.length)
                return false
            for (let i = 0, l = this.length; i < l; i++)
                if (this[i] !== arr[i])
                    return false
            return true
        },
        neg(i) {
            return this[this.length - i]
        },
        random() {
            return this[stairz.random(this.length)]
        },
        remove(i) {
            const [removed] = this.splice(i, 1)
            return removed
        },
        unique() {
            return [...new Set(this)]
        },
    }
    const elProto = {
        $: Element.prototype.querySelector,
        $$: Element.prototype.querySelectorAll,
        appendAfter($el) {
            // https://stackoverflow.com/a/5192810/9281985
            $el.parentNode.insertBefore(this, $el.nextSibling)
            return this
        },
        appendBefore($el) {
            $el.parentNode.insertBefore(this, $el)
            return this
        },
        appendTo($el) {
            $el.append(this)
            return this
        },
        css(props) {
            Object.assign(this.style, props)
            return this
        },
        fade(cb, dur = 500) {
            const { opacity, transition } = this.style
            this.css({
                transition: `opacity ${dur}ms`,
                opacity: 0,
            })
            setTimeout(() => {
                cb()
                this.css({ opacity })
                setTimeout(() => this.css({ transition }), dur)
            }, dur)
            return this
        },
    }
    const stairz = {
        copy(value) {
            const $tmp = $create("textarea", { value })
            $tmp.appendTo($body).select()
            document.execCommand("copy")
            $tmp.remove()
        },
        createDataResource(contentType, val) {
            return `data:${contentType},${encodeURIComponent(val)}`
        },
        createMap(obj) {
            const iter = Object.entries(obj)
            return new Map(iter)
        },
        dl(href, download = "go_drink_water_and_do_hwk") {
            const $a = $create("a", { href, download })
            $a.click()
        },
        getRandStr(length = 50, charTypes = "luns") {
            const chars = []
            const allChars = stairz.createMap({
                l: "abcdefghijklmnopqrstuvwxyz".split(""),
                u: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
                n: "0123456789".split(""),
                s: "!@#$%^&*()-=_+,.".split(""),
            })
            for (const charType of charTypes)
                chars.push(...allChars.get(charType))
            const res = []
            while (length--)
                res.push(chars.random())
            return res.join("")
        },
        getShortcuts() {
            return { $, $$, $head, $body, $create }
        },
        glob() {
            Object.assign(window, stairz.getShortcuts())
        },
        importModule(name) {
            const src = `https://climbthestairs.org/default/js/${name}.js`
            stairz.importScript(src)
        },
        importScript(src) {
            const $script = $create("script", { src })
            $script.appendTo($body).remove()
        },
        random(n) {
            return Math.floor(Math.random() * n)
        },
        subst(str, substs) {
            for (const [key, val] of Object.entries(substs))
                str = str.replace("${" + key + "}", val)
            return str
        },
        toss(err) {
            throw err
        },
    }
    const assignToProto = (target, source) => {
        const proto = target.prototype
        Object.entries(source).forEach(([key, val]) => {
            const fullName = `${proto.constructor.name}.prototype.${key}`
            if (proto.hasOwnProperty(key))
                console.warn(`Overriding ${fullName}!`)
            proto[key] = val
            Object.defineProperty(proto, key, { enumerable: false })
        })
    }
    assignToProto(Array, arrProto)
    assignToProto(Element, elProto)
    window.stairz = stairz
    console.log("Hello world!")
})();