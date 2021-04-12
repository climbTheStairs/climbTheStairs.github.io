;(() => {
    "use strict"
    const createTabs = () => {
        const tab1 = {
            title: "One",
            $content:
                "We must secure the existence of our people and a " +
                "future for trans children.",
        }
        const $penultimate = createFrag()
        $penultimate.append(
            "Penultimate",
            create("br"),
            "The spirit is willing but the flesh is weak",
            create("br"),
            "SCHADENFREUDE",
            create("br"),
            "3964 Elm Street and 1370 Rt. 21",
            create("br"),
            "The left hand does not know what the right hand is doing.",
        )
        const tab2 = {
            title: "Two",
            $content: $penultimate,
        }
        const tab3 = {
            $content: "Chaos is a ladder. Petyr Baelish, Littlefinger.",
        }
        const tabs = [tab1, tab2, tab3]
        const demoTabs = new stairz.Tabs("demo-tabs", tabs)
        $body.append(demoTabs.getEl())
        return demoTabs
    }
    const setEvents = (tabs) => {
        const $add = $("#add-tab")
        // const $remove = $("#remove-tab")
        const $getName = $("#get-tabs-name")
        const $getLen = $("#get-tabs-len")
        $add.onclick = () => {
            const title = prompt("Tab title:")
            const $content = prompt("Tab content:")
            tabs.addTab({ title, $content })
        }
        /*
        $remove.onclick = () => {
            const is = prompt("Tabs to remove (separate by commas):")
                .split(",")
                .map(i => +i)
            tabs.remove(...is)
        }
        //*/
        $getName.onclick = () => alert(tabs.name)
        $getLen.onclick = () => alert(tabs.length)
    }
    const demoTabs = createTabs()
    setEvents(demoTabs)
    console.log({ demoTabs })
    $body.append(
        new stairz.Tabs("extra-tabs", [{
            title: "heres another 1",
            $content: "cuz why not?",
        }]).getEl(),
        create("p", {
            textContent: "This is a paragraph.",
        }),
        create("p", {
            textContent: "This is another paragraph.",
        }),
    )
})()