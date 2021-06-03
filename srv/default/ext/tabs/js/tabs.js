;(() => {
    "use strict"
    const _Tab = class {
        constructor({ title, $content }, parentName, tabId) {
            this._$input = create("input", {
                type: "radio",
                name: "tab",
            })
            this._$title = create("label", {
                className: "tab-title",
                textContent: title,
            })
            this._$content = create("div", {
                className: "tab-content",
            })
            this._$content.append($content)
            this._parentName = parentName
            this._tabId = tabId
            this.refreshId()
        }
        remove() {
            for (const $el of [this._$input, this._$title, this._$content])
                $el.remove()
            return this
        }
        check() {
            this._$input.checked = true
            return this
        }
        isChecked() {
            return this._$input.checked
        }
        refreshId() {
            const id = `${this._parentName}-tab-${this._tabId}`
            this._$input.id = id
            this._$title.htmlFor = id
            return this
        }
        getTabId() {
            return this._tabId
        }
        setTabId(val) {
            this._tabId = val
            this.refreshId()
            return this
        }
        incrementTabId() {
            this.setTabId(this.getTabId() + 1)
            return this
        }
        decrementTabId() {
            this.setTabId(this.getTabId() - 1)
            return this
        }
        getParentName() {
            return this._parentName
        }
        setParentName(val) {
            this._parentName = val
            this.refreshId()
            return this
        }
        getEl() {
            const $frag = createFrag()
            $frag.append(this._$input, this._$title, this._$content)
            return $frag
        }
    }
    const _allTabs = []
    const Tabs = class {
        constructor(name, tabs = []) {
            this._tabs = []
            this._$tabs = create("form", {
                id: name,
                className: "tabs",
            })
            this._name = name
            tabs.forEach(this.add, this)
            _allTabs.push(this)
        }
        add(tab) {
            tab = new _Tab(tab, this.getName(), this.getLength())
            this._tabs.push(tab)
            this._$tabs.append(tab.getEl())
            if (this.getLength() === 1)
                tab.check()
            return this
        }
        remove(tabId) {
            const [removedTab] = this._tabs.splice(tabId, 1)
            if (!removedTab)
                throw new TypeError(`tab ${tabId} does not exist`)
            removedTab.remove()
            if (tabId < 0)
                tabId += this.getLength()
            for (let i = tabId, l = this._tabs.length; i < l; i++)
                this._tabs[i].setTabId(i)
            if (removedTab.isChecked() && this.getLength())
                this.check(0)
            return this
        }
        check(tabId) {
            const tab = this._tabs[tabId]
            if (!tab)
                throw new TypeError(`tab ${tabId} does not exist`)
            tab.check()
            return this
        }
        getName() {
            return this._name
        }
        setName(name) {
            this._name = name
            for (const tab of this._tabs)
                tab.setName(name)
            return this
        }
        getLength() {
            return this._tabs.length
        }
        setLength(len) {
            if (len < 0 || this.getLength() < len)
                throw new RangeError(`invalid length: ${len}`)
            while (this.getLength() > len)
                this.remove(len)
            return this
        }
        appendTo($el) {
            $el.append(this._$tabs)
            return this
        }
        getEl() {
            return this._$tabs
        }
        static getAllTabs() {
            const allTabs = [..._allTabs]
            return allTabs
        }
    }
    window.stairz.Tabs = Tabs
})()