/**
 * Instructions:
 * 1. Change the path `/edit` to `/preview` in the url
 *    `/spreadsheets/d/[DOCUMENTID]/edit#gid=0`.
 * 2. For each sheet, there should be a separate `iframe`. Find each
 *    the source of each `iframe` you want to save and open them in new
 *    windows.
 * 3. Call `stairz.saveGoogleSheets()` in each window.
 */
;(() => {
    "use strict"
    
    const { $, $$ } = stairz.getShortcuts()
    
    const saveGoogleSheets = (fName = "google_sheets_dl") => {
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
        stairz.dl(resource, fName)
    }
    
    window.stairz.saveGoogleSheets = saveGoogleSheets
})();