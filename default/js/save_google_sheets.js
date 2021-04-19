window.stairz.saveGoogleSheets = () => {
    "use strict"

    const tables = [...$$("table.waffle")]
    if (tables.length !== 1)
        throw new TypeError("missing or multiple tables")
    const [$table] = tables
    if ($table.$(":scope > thead").textContent.trim())
        throw new TypeError("thead is not empty")

    const table = [...$table.$(":scope > tbody").children].map((row) => {
        row = [...row.children]
            .filter(cell => !cell.matches("th.row-headers-background"))
            .map(cell => cell.innerText.trim())
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