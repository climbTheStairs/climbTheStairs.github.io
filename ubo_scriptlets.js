/// ignore-target-blank.js
/// alias itb.js
// example.com##+js(ignore-target-blank)
document.addEventListener("click", ({ target }) => {
    console.log("fire")
    const a = target.closest("a")
    if (a && a.target === "_blank")
        a.target = "_self"
})
