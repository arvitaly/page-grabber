"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var funcs_1 = require("./funcs");
var x = _1.default({}).$("sel", {})[0].innerHTML;
x.charAt(0);
funcs_1.child(0, {});
funcs_1.css("display").charAt(0);
(funcs_1.hasClass("x") === true).valueOf();
funcs_1.html().charCodeAt(0);
funcs_1.obj("path");
funcs_1.val().charCodeAt(0);
var f = funcs_1.attr("11");
if (f) {
    f.toLowerCase();
}
funcs_1.attr$("11").toLowerCase();
var x2 = funcs_1.sel("sel", { id: 1 });
if (x2) {
    x2.id.toExponential();
}
var x3 = funcs_1.sel("sel", [{ m: 15 }]);
if (x3) {
    x3[0].m.toExponential();
}
var x4 = funcs_1.sel("x", funcs_1.text());
if (x4) {
    x4.charAt(0);
}
var x5 = funcs_1.nextUntil$("selector", "selector2", ".dub", funcs_1.sel$(".actorInfo .name>a", [{
        href: funcs_1.attr$("href"),
        text: funcs_1.text(),
        p: funcs_1.prop(""),
    }]));
if (x5) {
    x5[0].href.toLocaleLowerCase();
}
funcs_1.sel$("x", { a: 5 }).a.toExponential();
