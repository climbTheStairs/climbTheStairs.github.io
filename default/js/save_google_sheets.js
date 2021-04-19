window.stairz.saveGoogleSheets = () => {
    "use strict"

    const waffles = [...$$("table.waffle")]
    if (waffles.length !== 1)
        throw new TypeError("missing or multiple .waffle elements")
    const [waffle] = waffles
    if (waffle.$(":scope > thead").textContent.trim())
        throw new TypeError("thead is not empty")

    const table = [...waffle.$(":scope > tbody").children].map((row) => {
        row = [...row.children]
            .filter(cell => !cell.matches("th.row-headers-background"))
            .map(cell => cell.textContent)
        return row
    })
    const keys = table.shift()
    const data = table.map((row) => {
        const data = {}
        row.forEach((cell, i) => data[keys[i]] = cell)
        return data
    })
    const resource = stairz.createDataResource(
        "application/json",
        JSON.stringify(data, null, 4),
    )
    stairz.dl(resource, "google_sheets_dl")
}