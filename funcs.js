"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sel(selector, obj) {
    return { $$$gp: { m: "_sel", selector: selector, obj: obj } };
}
exports.sel = sel;
function child(index, obj) {
    return { $$$gp: { m: "_child", index: index, obj: obj } };
}
exports.child = child;
function text() {
    return { $$$gp: { m: "_text" } };
}
exports.text = text;
function html() {
    return { $$$gp: { m: "_html" } };
}
exports.html = html;
function attr(name) {
    return { $$$gp: { m: "_attr", name: name } };
}
exports.attr = attr;
function val() {
    return { $$$gp: { m: "_val" } };
}
exports.val = val;
function css(name) {
    return { $$$gp: { m: "_css", name: name } };
}
exports.css = css;
function hasClass(name) {
    return { $$$gp: { m: "_hasClass", name: name } };
}
exports.hasClass = hasClass;
function obj(path, obj) {
    return { $$$gp: { m: "_obj", path: path, obj: obj } };
}
exports.obj = obj;
