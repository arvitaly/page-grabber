"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sel = function (selector, o) {
    return { $$$gp: { m: "_sel", selector: selector, obj: o } };
};
exports.sel$ = function (selector, o) {
    return { $$$gp: { m: "_sel$", selector: selector, obj: o } };
};
exports.child = function (index, o) {
    return { $$$gp: { m: "_child", index: index, obj: o } };
};
exports.child$ = function (index, o) {
    return { $$$gp: { m: "_child$", index: index, obj: o } };
};
exports.text = function () {
    return { $$$gp: { m: "_text" } };
};
exports.html = function () {
    return { $$$gp: { m: "_html" } };
};
exports.attr = function (name) {
    return { $$$gp: { m: "_attr", name: name } };
};
exports.attr$ = function (name) {
    return { $$$gp: { m: "_attr$", name: name } };
};
exports.prop = function (name) {
    return { $$$gp: { m: "_prop", name: name } };
};
exports.val = function () {
    return { $$$gp: { m: "_val" } };
};
exports.css = function (name) {
    return { $$$gp: { m: "_css", name: name } };
};
exports.hasClass = function (name) {
    return { $$$gp: { m: "_hasClass", name: name } };
};
exports.nextUntil = function (startSelector, stopSelector, selector, o) {
    return { $$$gp: { m: "_nextUntil", startSelector: startSelector, stopSelector: stopSelector, selector: selector, obj: o } };
};
exports.nextUntil$ = function (startSelector, stopSelector, selector, o) {
    return { $$$gp: { m: "_nextUntil$", startSelector: startSelector, stopSelector: stopSelector, selector: selector, obj: o } };
};
exports.obj = (function (path, o) {
    return { $$$gp: { m: "_obj", path: path, obj: o } };
});
