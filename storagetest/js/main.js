(() => {
    "use strict"

    if (localStorage.getItem("test"))
        $("textarea").value = "not empty"

    $("button").onclick = () => {
        localStorage.setItem("test", true)
        window.location.reload(true)
    }
})()
