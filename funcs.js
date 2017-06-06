"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sel = function (selector, obj) {
    return { $$$gp: { m: "_sel", selector: selector, obj: obj } };
};
exports.child = function (index, obj) {
    return { $$$gp: { m: "_child", index: index, obj: obj } };
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
exports.val = function () {
    return { $$$gp: { m: "_val" } };
};
exports.css = function (name) {
    return { $$$gp: { m: "_css", name: name } };
};
exports.hasClass = function (name) {
    return { $$$gp: { m: "_hasClass", name: name } };
};
exports.obj = (function (path, obj) {
    return { $$$gp: { m: "_obj", path: path, obj: obj } };
});
;
;
;
;
;
;
;
;
;
;
;
;
;
