/// ignore-target-blank.js
/// alias itb.js
// example.com##+js(ignore-target-blank)
(() => {
    const ignoreTargetBlank = ({ target }) => {
        const a = target.closest("a")
        if (!a || a.target !== "_blank")
            return
        a.target = "_self"
    }
    document.addEventListener("click", ignoreTargetBlank)
})()

/// throw-err.js
/// alias err.js
// example.com##+js(throw-err)
(() => {
    const toss = () => {
        const up = new Error("throw-err.js")
        throw up
    }
    document.addEventListener("click", toss)
})()
