"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsdom_1 = require("jsdom");
var _1 = require("./../");
var _2 = require("./../");
var w = new jsdom_1.JSDOM("<div id=\"root\"></div>").window;
function setHtml(html) {
    w.document.querySelector("#root").innerHTML = html;
}
var grabber = _1.default(w);
it("if obj is function, should call it", function () {
    expect(grabber.grab(function () { return 20; })).toBe(20);
});
it("sel should return array if obj is array", function () {
    setHtml("<ul><li>1</li><li>2</li></ul>");
    expect(grabber.grab(_2.sel("ul>li", [_2.text()]))).toEqual(["1", "2"]);
});
it("sel$ should throw error, when element not found by selector  and return it if found", function () {
    setHtml("<div id=\"test\" data-value=\"\">111</div>");
    expect(function () { return grabber.grab(_2.sel$("#test2", _2.attr("data-value"))); })
        .toThrowError("Not found element by selector #test2");
    expect(grabber.grab(_2.sel$("#test", "Hi"))).toBe("Hi");
});
it("text should return inner text of element", function () {
    setHtml("<div><span>Hello, world!</span></div>");
    expect(grabber.grab(_2.sel("#root>div>span", _2.html()))).toBe("Hello, world!");
});
it("html should return inner html of element", function () {
    setHtml("<div><span>Hello, world!</span></div>");
    expect(grabber.grab(_2.sel("#root>div", _2.html()))).toBe("<span>Hello, world!</span>");
});
it("attr should return attribute value", function () {
    setHtml("<div id=\"test\" data-value=\"11\"></div>");
    expect(grabber.grab(_2.sel("#test", _2.attr("data-value")))).toBe("11");
});
it("attr should be null if empty", function () {
    setHtml("<input id=\"test\" disabled />");
    expect(grabber.grab(_2.sel("#test", _2.attr("disabled")))).toBe(null);
});
it("attr$ should throw error, if empty and return it if found", function () {
    setHtml("<input id=\"test\" value=\"\" />");
    expect(function () { return grabber.grab(_2.sel("#test", _2.attr$("value"))); })
        .toThrowError("Attribute `value` should be non-empty");
    setHtml("<input id=\"test\" value=\"1\" />");
    expect(grabber.grab(_2.sel("#test", _2.attr$("value")))).toBe("1");
});
it("css should return computed style of element", function () {
    setHtml("<div id=\"t1\"></div>");
    w.document.querySelector("#t1").style.height = "500px";
    expect(grabber.grab(_2.sel("#t1", _2.css("height")))).toBe("500px");
});
it("hasClass should check class in classname of element", function () {
    setHtml("<div id=\"d1\" class=\"c1 c2 c3\"></div>");
    expect(grabber.grab(_2.sel("#d1", _2.hasClass("c2")))).toBe(true);
    expect(grabber.grab(_2.sel("#d1", _2.hasClass("c4")))).toBe(false);
});
it("val should return value-property of element", function () {
    setHtml("<input type=\"text\" value=\"Hi\">");
    expect(grabber.grab(_2.sel("input", _2.val()))).toBe("Hi");
});
it("prop should return property of element", function () {
    setHtml("<input type=\"text\" value=\"Hi\">");
    expect(grabber.grab(_2.sel("input", _2.prop("type")))).toBe("text");
    w.document.querySelector("input").test = 15;
    expect(grabber.grab(_2.sel("input", _2.prop("test")))).toBe(15);
});
it("nextUntil should return element by startSelector, endSelector, selector", function () {
    // See more https://api.jquery.com/nextUntil/
    var html = "<dl>\n        <dt id=\"term-1\">term 1</dt>\n        <dd>definition 1-a</dd>\n        <dd>definition 1-b</dd>\n        <dd>definition 1-c</dd>\n        <dd>definition 1-d</dd>\n        <dt id=\"term-2\">term 2</dt>\n        <dd>definition 2-a</dd>\n        <dd>definition 2-b</dd>\n        <dd>definition 2-c</dd>\n        <dt id=\"term-3\">term 3</dt>\n        <dd>definition 3-a</dd>\n        <dd>definition 3-b</dd>\n    </dl>";
    setHtml(html);
    expect(grabber.grab(_2.nextUntil("#term-2", "#term-3", "dd", [_2.text()]))).toEqual(["definition 2-a", "definition 2-b", "definition 2-c"]);
    expect(grabber.grab(_2.sel("#root", _2.nextUntil("#term-2", "#term-3", "dd", [_2.text()])))).toEqual(["definition 2-a", "definition 2-b", "definition 2-c"]);
});
it("nextUntil$ should throw error if element not found and return if element found", function () {
    setHtml("<div id=\"term-1\"></div><div>test</div><div id=\"term-3\"></div>");
    expect(function () { return grabber.grab(_2.nextUntil$("#term-2", "#term-3", "dd", [_2.text()])); }).toThrowError("Not found element by selector dd, start selector #term-2, stop selector #term-3");
    expect(function () { return grabber.grab(_2.nextUntil$("#term-1", "#term-3", "dd", _2.text())); }).toThrowError("Not found element by selector dd, start selector #term-1, stop selector #term-3");
    expect(grabber.grab(_2.nextUntil$("#term-1", "#term-3", "div", _2.text()))).toBe("test");
});
it("child should return childNodes by number", function () {
    setHtml("<div><span>111</span></div>");
    expect(grabber.grab(_2.sel("div", _2.child(0, _2.text())))).toBe("111");
});
it("child$ should return throw error if not found element and return it if found", function () {
    setHtml("<div><span>111</span></div>");
    expect(function () { return grabber.grab(_2.sel("div", _2.child$(5, _2.text()))); }).toThrowError("Not found element by index 5");
    expect(grabber.grab(_2.sel("div", _2.child$(0, _2.text())))).toBe("111");
});
it("obj should return value by path", function () {
    w.test = { value: 222 };
    expect(grabber.grab(_2.obj("test.value"))).toBe(222);
    expect(grabber.grab(_2.obj("test", {
        r: _2.obj("value"),
    }))).toEqual({ r: 222 });
});
it("obj should return simple value", function () {
    w.test = { value1: 15, value2: [1, 2, null, 3, {}], value3: [] };
    expect(grabber.grab(_2.obj("test.value1"))).toBe(15);
    expect(grabber.grab(_2.obj("test.value2", []))).toEqual([1, 2, null, 3, {}]);
    expect(grabber.grab(_2.obj("test.value2", [{}]))).toEqual([{}, {}, {}, {}, {}]);
});
it("obj should return null if not found", function () {
    expect(grabber.grab(_2.obj("example_1"))).toBe(null);
});
describe("observe", function () {
    beforeEach(function () {
        jest.useFakeTimers();
    });
    afterEach(function () {
        jest.useRealTimers();
    });
    it("observe should call callback function when data changed", function () {
        setHtml("<div><span id=\"s1\">111</span></div>");
        var cb = jest.fn();
        var convert = jest.fn().mockImplementation(function (value) { return value + 5; });
        grabber.observe(_2.sel("#s1", _2.text()), cb, convert);
        expect(cb.mock.calls).toEqual([["1115"]]);
        cb.mockClear();
        jest.runTimersToTime(15);
        expect(cb.mock.calls.length).toBe(0);
        w.document.querySelector("#s1").innerHTML = "222";
        jest.runTimersToTime(15);
        expect(cb.mock.calls).toEqual([["2225"]]);
    });
});
/*describe("model", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.useRealTimers();
    });
    it("model should call callback-function when data was changed", () => {
        setHtml(`<div><span id="s1">111</span></div>`);
        const cb = jest.fn();
        const cb2 = jest.fn();
        const m = grabber.model({
            t1: sel("#s1", text()),
        }, { t1: (raw: any) => raw + 2 });
        expect(() => m.on("t2", cb)).toThrowError("Unknown model t2");
        m.on("t1", cb);
        m.on("t1", cb2);
        jest.runTimersToTime(20);
        expect(cb.mock.calls).toEqual([["1112"]]);
        expect(cb2.mock.calls).toEqual([["1112"]]);
        cb.mockClear();

        jest.runTimersToTime(20);
        expect(cb.mock.calls).toEqual([]);
        (w.document.querySelector("#s1") as HTMLElement).innerHTML = "222";
        jest.runTimersToTime(20);
        expect(cb.mock.calls).toEqual([["2222"]]);
        expect(cb2.mock.calls).toEqual([["2222"]]);
    });
});
*/
