;(() => {
    "use strict"
    window.Tabs = class {
        constructor(name, tabs = []) {
            this.$tabs = create("form", {
                id: name,
                className: "tabs",
            })
            this._name = name
            this._length = 0
            this.add(...tabs)
        }
        
        _createTab({
            title = `Tab ${this.length}`,
            $content = "",
        } = {}) {
            const $tab = createFrag()
            const id = `${this.name}-tab-${this.length}`
            const $input = create("input", {
                type: "radio",
                id,
                name: "tab",
                checked: !this.length,
            })
            const $tabTitle = create("label", {
                className: "tab-title",
                htmlFor: id,
                textContent: title,
            })
            const $tabContent = create("div", {
                className: "tab-content",
            })
            
            $tabContent.append($content)
            $tab.append($input, $tabTitle, $tabContent)
            
            this._length++
            
            return $tab
        }
        
        add(...tabs) {
            for (const tab of tabs)
                this.$tabs.append(this._createTab(tab))
        }
        
        /**
         * `remove` is very buggy and unnecessary. Do not use unless
         * this functionality is needed.
         *
         * TOFIX:
         * - Removing selected tab leaves no tab selected.
         * - Tab ids are not updated after removing previous tabs.
         *
        remove(...is) {
            const toRemove = is.filter(i => i < this.length).map((i) => {
                const id = `#${this.name}-tab-${i}`
                return [
                    id,
                    id + " + .tab-title",
                    id + " + .tab-title + .tab-content",
                ].join(", ")
            })
            if (!toRemove.length)
                return
            $$(toRemove.join(", ")).forEach($el => $el.remove())
            this._length -= toRemove.length
        }
         */
        
        get name() { return this._name }
        set name(name) {
            throw new TypeError("Tabs name cannot be reassigned")
        }
        
        get length() { return this._length }
        set length(l) {
            throw new TypeError("Tabs length cannot be reassigned")
        }
    }
})()
