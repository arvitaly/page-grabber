import { JSDOM } from "jsdom";
import Grabber from "./../";
import {
    attr, attr$, child, child$,
    css, hasClass, html,
    nextUntil, nextUntil$, obj, prop, sel,
    sel$, text, val,
} from "./../";
const w = new JSDOM(`<div id="root"></div>`).window;
function setHtml(html: string) {
    (w.document.querySelector("#root") as HTMLElement).innerHTML = html;
}
const grabber = Grabber(w);
it("if obj is function, should call it", () => {
    expect(grabber.grab(() => 20)).toBe(20);
});
it("sel should return array if obj is array", () => {
    setHtml(`<ul><li>1</li><li>2</li></ul>`);
    expect(grabber.grab(sel("ul>li", [text()]))).toEqual(["1", "2"]);
});
it("sel$ should throw error, when element not found by selector  and return it if found", () => {
    setHtml(`<div id="test" data-value="">111</div>`);
    expect(() => grabber.grab(sel$("#test2", attr("data-value"))))
        .toThrowError("Not found element by selector #test2");
    expect(grabber.grab(sel$("#test", "Hi"))).toBe("Hi");
});
it("text should return inner text of element", () => {
    setHtml(`<div><span>Hello, world!</span></div>`);
    expect(grabber.grab(sel("#root>div>span", html()))).toBe("Hello, world!");
});
it("html should return inner html of element", () => {
    setHtml(`<div><span>Hello, world!</span></div>`);
    expect(grabber.grab(sel("#root>div", html()))).toBe("<span>Hello, world!</span>");
});
it("attr should return attribute value", () => {
    setHtml(`<div id="test" data-value="11"></div>`);
    expect(grabber.grab(sel("#test", attr("data-value")))).toBe("11");
});
it("attr should be null if empty", () => {
    setHtml(`<input id="test" disabled />`);
    expect(grabber.grab(sel("#test", attr("disabled")))).toBe(null);
});
it("attr$ should throw error, if empty and return it if found", () => {
    setHtml(`<input id="test" value="" />`);
    expect(() => grabber.grab(sel("#test", attr$("value"))))
        .toThrowError("Attribute `value` should be non-empty");
    setHtml(`<input id="test" value="1" />`);
    expect(grabber.grab(sel("#test", attr$("value")))).toBe("1");
});
it("css should return computed style of element", () => {
    setHtml(`<div id="t1"></div>`);
    (w.document.querySelector("#t1") as HTMLElement).style.height = "500px";
    expect(grabber.grab(sel("#t1", css("height")))).toBe("500px");
});
it("hasClass should check class in classname of element", () => {
    setHtml(`<div id="d1" class="c1 c2 c3"></div>`);
    expect(grabber.grab(sel("#d1", hasClass("c2")))).toBe(true);
    expect(grabber.grab(sel("#d1", hasClass("c4")))).toBe(false);
});
it("val should return value-property of element", () => {
    setHtml(`<input type="text" value="Hi">`);
    expect(grabber.grab(sel("input", val()))).toBe("Hi");
});
it("prop should return property of element", () => {
    setHtml(`<input type="text" value="Hi">`);
    expect(grabber.grab(sel("input", prop("type")))).toBe("text");
    (w.document.querySelector("input") as any).test = 15;
    expect(grabber.grab(sel("input", prop("test")))).toBe(15);
});
it("nextUntil should return element by startSelector, endSelector, selector", () => {
    // See more https://api.jquery.com/nextUntil/
    const html = `<dl>
        <dt id="term-1">term 1</dt>
        <dd>definition 1-a</dd>
        <dd>definition 1-b</dd>
        <dd>definition 1-c</dd>
        <dd>definition 1-d</dd>
        <dt id="term-2">term 2</dt>
        <dd>definition 2-a</dd>
        <dd>definition 2-b</dd>
        <dd>definition 2-c</dd>
        <dt id="term-3">term 3</dt>
        <dd>definition 3-a</dd>
        <dd>definition 3-b</dd>
    </dl>`;
    setHtml(html);
    expect(grabber.grab(nextUntil("#term-2", "#term-3", "dd", [text()]))).toEqual(
        ["definition 2-a", "definition 2-b", "definition 2-c"],
    );
    expect(grabber.grab(sel("#root", nextUntil("#term-2", "#term-3", "dd", [text()])))).toEqual(
        ["definition 2-a", "definition 2-b", "definition 2-c"],
    );
});
it("nextUntil$ should throw error if element not found and return if element found", () => {
    setHtml(`<div id="term-1"></div><div>test</div><div id="term-3"></div>`);
    expect(() => grabber.grab(nextUntil$("#term-2", "#term-3", "dd", [text()]))).toThrowError(
        "Not found element by selector dd, start selector #term-2, stop selector #term-3",
    );
    expect(() => grabber.grab(nextUntil$("#term-1", "#term-3", "dd", text()))).toThrowError(
        "Not found element by selector dd, start selector #term-1, stop selector #term-3",
    );
    expect(grabber.grab(nextUntil$("#term-1", "#term-3", "div", text()))).toBe("test");
});
it("child should return childNodes by number", () => {
    setHtml(`<div><span>111</span></div>`);
    expect(grabber.grab(sel("div", child(0, text())))).toBe("111");
});
it("child$ should return throw error if not found element and return it if found", () => {
    setHtml(`<div><span>111</span></div>`);
    expect(() => grabber.grab(sel("div", child$(5, text())))).toThrowError("Not found element by index 5");
    expect(grabber.grab(sel("div", child$(0, text())))).toBe("111");
});
it("obj should return value by path", () => {
    (w as any).test = { value: 222 };
    expect(grabber.grab(obj("test.value"))).toBe(222);
    expect(grabber.grab(obj("test", {
        r: obj("value"),
    }))).toEqual({ r: 222 });
});
it("obj should return simple value", () => {
    (w as any).test = { value1: 15, value2: [1, 2, null, 3, {}], value3: [] };
    expect(grabber.grab(obj("test.value1"))).toBe(15);
    expect(grabber.grab(obj("test.value2", []))).toEqual([1, 2, null, 3, {}]);
    expect(grabber.grab(obj("test.value2", [{}]))).toEqual([{}, {}, {}, {}, {}]);
});
it("obj should return null if not found", () => {
    expect(grabber.grab(obj("example_1"))).toBe(null);
});
describe("observe", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.useRealTimers();
    });
    it("observe should call callback function when data changed", () => {
        setHtml(`<div><span id="s1">111</span></div>`);
        const cb = jest.fn();
        const convert = jest.fn().mockImplementation((value: string) => value + 5);
        grabber.observe(sel("#s1", text()), cb, convert);
        expect(cb.mock.calls).toEqual([["1115"]]);
        cb.mockClear();
        jest.runTimersToTime(15);
        expect(cb.mock.calls.length).toBe(0);
        (w.document.querySelector("#s1") as HTMLElement).innerHTML = "222";
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
