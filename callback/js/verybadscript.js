const createMsg = () => create("p", {
    textContent: "Malicious script loaded!!!1!1",
})
setInterval(() => $body.append(createMsg()), 2000)
