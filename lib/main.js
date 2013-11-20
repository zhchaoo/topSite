var maxTabs = 10;

var tests = []

var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var timers = require("sdk/timers");
var self = require("sdk/self");
var data = self.data;

var index = 0

function runNextTrunk() {
    for each (var tab in tabs) {
        // load a url from test pools.
        tab.url = "http://" + tests[index];

        // add counter
        index++;
        if (index >= tests.length)
            return;
    }
    timers.setTimeout(runNextTrunk, 10000);
}

function runTopSites(text) {
    tests = text.split("\n");

    while(tabs.length < maxTabs) {
        tabs.open("about:blank");
    }

    tabs.on('load', function(tab) {
        // attach spider scripts when loaded.
        if (tab.url == "about:blank") {
            return;
        }
        tab.attach({
            contentScriptFile: data.url("spider.js")
        });
        console.log("tab load url is " + tab.url);
    });

    timers.setTimeout(runNextTrunk, 1000);
}

var sites_entry = require("sdk/panel").Panel({
    width: 240,
    height: 400,
    contentURL: data.url("sites-entry.html"),
    contentScriptFile: data.url("get-text.js")
});

var widget = widgets.Widget({
    id: "top Sites",
    label: "Test top sites",
    contentURL: data.url("icon.png"),
    panel: sites_entry
});

sites_entry.on("show", function() {
    sites_entry.port.emit("show");
});

sites_entry.port.on("sites-entered", function (text) {
    runTopSites(text);
});

