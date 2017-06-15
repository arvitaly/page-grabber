import { attr, child, css, hasClass, html, obj, sel, text, val } from "./typings";

const x1 = attr("11").toLowerCase();
const x2 = sel("sel", { id: 1 });
if (x2) {
    x2.id.toExponential();
}
const x3 = sel("sel", [{ m: 15 }]);
if (x3) {
    x3[0].m.toExponential();
}
const x4 = sel("x", text());
if (x4) {
    x4.charAt(0);
}
