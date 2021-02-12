/// ignore-target-blank.js
/// alias itb.js
// example.com##+js(ignore-target-blank)
(() => {
    const ignoreTargetBlank = ({ target }) => {
        const a = target.closest("a")
        if (a || a.target !== "_blank")
            return
        a.target = "_self"
    }
    document.addEventListener("click", ignoreTargetBlank)
})()
