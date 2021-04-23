/// ignore-target-blank.js
/// alias itb.js
// example.com##+js(ignore-target-blank)
;(() => {
    const ignoreTargetBlank = ({ target }) => {
        const a = target.closest("a")
        if (!a || a.target !== "_blank")
            return
        a.target = "_self"
    }
    document.addEventListener("click", ignoreTargetBlank)
    console.log("+js(ignore-target-blank)")
})();

/// lazy-load.js
/// alias lzl.js
// example.com##+js(lazy-load)
;(() => {
    const $$ = document.querySelectorAll.bind(document)
    const notLoaded = $$("img[data-src]")
    notLoaded.forEach(($el) => {
        console.log($el.dataset.src)
        $el.src = $el.dataset.src
        delete $el.dataset.src
    })
    console.log("+js(lazy-load)", notLoaded)
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