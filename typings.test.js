"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typings_1 = require("./typings");
var x1 = typings_1.attr("11").toLowerCase();
var x2 = typings_1.sel("sel", { id: 1 });
if (x2) {
    x2.id.toExponential();
}
var x3 = typings_1.sel("sel", [{ m: 15 }]);
if (x3) {
    x3[0].m.toExponential();
}
var x4 = typings_1.sel("x", typings_1.text());
if (x4) {
    x4.charAt(0);
}
