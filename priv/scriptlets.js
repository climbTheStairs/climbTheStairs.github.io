/// ignore-target-blank.js
/// alias itb.js
// example.com##+js(ignore-target-blank)
;(() => {
    const ignoreTargetBlank = ({ target }) => {
        const a = target.closest("a")
        if (!a || a.target !== "_blank")
            return
        a.target = "_self"
        console.log("+js(ignore-target-blank)")
    }
    document.addEventListener("click", ignoreTargetBlank)
})();

/// unlazy-load.js
/// alias ull.js
// example.com##+js(unlazy-load, data-srcset, srcset)
;(() => {
    const $$ = document.querySelectorAll.bind(document)
    const lazyAttr = "{{1}}" !== "{{1" + "}}" ? "{{1}}" : "data-src"
    const realAttr = "{{2}}" !== "{{2" + "}}" ? "{{2}}" : "src"
    console.log({ lazyAttr, realAttr })
    /*
    const unlazyLoad = () => {
        $$(`[${lazyAttr}]`).forEach(($el) => {
            const val = $el.getAttribute(lazyAttr)
            $el.setAttribute(realAttr, val)
        })
        console.log(`+js(unlazy-load, ${lazyAttr}, ${realAttr})`)
    }
    window.addEventListener("load", unlazyLoad)
    */
})();

/// stairz.js
/// alias cts.js
// example.com##+js(stairz)
;(() => {
    const $script = document.createElement("script")
    $script.src = "https://climbthestairs.org/default/js/main.js"
    const $body = document.body || document
    $body.append($script)
    $script.remove()
    console.log("+js(stairz)")
})();
