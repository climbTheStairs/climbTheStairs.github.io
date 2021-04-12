;(() => {
    "use strict"
    
    const _Tab = function({
        title = `Tab`,
        $content = "",
    } = {}, parentName, tabId) {
        this.remove = function() {
            for (const $el of [_$input, _$title, _$content])
                $el.remove()
            return this
        }
        this.check = function() {
            _$input.checked = true
            return this
        }
        this.isChecked = function() {
            return _$input.checked
        }
        this.refreshId = function() {
            const id = `${_parentName}-tab-${_tabId}`
            _$input.id = id
            _$title.htmlFor = id
            return this
        }
        this.getTabId = function() {
            return _tabId
        }
        this.setTabId = function(val) {
            _tabId = val
            this.refreshId()
            return this
        }
        this.incrementTabId = function() {
            this.setTabId(this.getTabId() + 1)
            return this
        }
        this.decrementTabId = function() {
            this.setTabId(this.getTabId() - 1)
            return this
        }
        this.getParentName = function() {
            return _parentName
        }
        this.setParentName = function(val) {
            _parentName = val
            this.refreshId()
            return this
        }
        this.getEl = function() {
            const $frag = createFrag()
            $frag.append(_$input, _$title, _$content)
            return $frag
        }
        
        const _$input = create("input", {
            type: "radio",
            name: "tab",
        })
        const _$title = create("label", {
            className: "tab-title",
            textContent: title,
        })
        const _$content = create("div", {
            className: "tab-content",
        })
        _$content.append($content)
        let _parentName = parentName
        let _tabId = tabId
        
        this.refreshId()
    }
    
    const Tabs = function(name, tabs = [{}]) {
        this.addTab = function(tab) {
            tab = new _Tab(tab, this.getName(), this.getLength())
            _tabs.push(tab)
            _$tabs.append(tab.getEl())
            return this
        }
        this.addTabs = function(...tabs) {
            tabs.forEach(this.addTab, this)
            return this
        }
        this.removeTab = function(tabId) {
            const [removedTab] = _tabs.splice(tabId, 1)
            if (!removedTab)
                throw new Error(`Tab ${tabId} does not exist`)
            removedTab.remove()
            if (removedTab.isChecked())
                _tabs[0] && _tabs[0].check()
            for (let i = tabId, l = _tabs.length; i < l; i++)
                _tabs[i].setTabId(i)
            return this
        }
        this.removeTabs = function(...tabIds) {
            tabIds.forEach(this.removeTab, this)
            return this
        }
        this.getName = function() {
            return _name
        }
        this.setName = function(name) {
            for (const tab of _tabs)
                tab.setName(name)
            _name = name
            return this
        }
        this.getLength = function() {
            return _tabs.length
        }
        this.setLength = function(len) {
            for (const tab of _tabs.slice(len))
                tab.remove()
            _tabs.length = len
            return this
        }
        this.getEl = function() {
            return _$tabs
        }
        
        const _tabs = []
        const _$tabs = create("form", {
            id: name,
            className: "tabs",
        })
        let _name = name
        
        this.addTabs(...tabs)
        _tabs[0].check()
    }
    
    window.stairz.Tabs = Tabs
})()