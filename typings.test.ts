import Grabber from ".";
import {
    attr, attr$, child, css, hasClass, html, nextUntil$, obj, prop, sel, sel$, text,
    val,
} from "./funcs";

const x = Grabber({} as any).$("sel", {})[0].innerHTML;
x.charAt(0);

child(0, {});
css("display").charAt(0);
(hasClass("x") === true).valueOf();
html().charCodeAt(0);
obj("path");
val().charCodeAt(0);

const f = attr("11");
if (f) { f.toLowerCase(); }
attr$("11").toLowerCase();
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
const x5 = nextUntil$(`selector`, "selector2", ".dub", sel$(".actorInfo .name>a", [{
    href: attr$("href"),
    text: text(),
    p: prop(""),
}]));
if (x5) {
    x5[0].href.toLocaleLowerCase();
}
sel$("x", { a: 5 }).a.toExponential();
