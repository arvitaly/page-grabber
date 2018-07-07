"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsdom_1 = require("jsdom");
var _1 = require(".");
var h = "\n    <div id=\"div1\">\n        <ul>\n            <li><a href=\"link1\">Title1</a><span><b>Content1</b></span></li>\n            <li><a href=\"link2\">Titl2</a><span><b>Content2</b></span></li>\n        </ul>\n    </div>\n";
var window = new jsdom_1.JSDOM(h).window;
var grabber = _1.default(window);
var res = grabber.grab(_1.sel$("#div1", {
    items: _1.sel$("ul>li", [
        {
            title: _1.sel$("a", _1.text()),
            link: _1.sel$("a", _1.attr$("href")),
            content: _1.sel$("span", _1.html()),
        },
    ]),
}));
for (var _i = 0, _a = res.items; _i < _a.length; _i++) {
    var item = _a[_i];
    // tslint:disable-next-line:no-console
    console.log("title: ", item.title, "content: " + item.content);
    // title:  Title1 content: <b>Content1</b>
    // title:  Titl2 content: <b>Content2</b>
}
