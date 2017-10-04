import { JSDOM } from "jsdom";
import createGrabber, { attr$, html, sel$, text } from ".";

const h = `
    <div id="div1">
        <ul>
            <li><a href="link1">Title1</a><span><b>Content1</b></span></li>
            <li><a href="link2">Titl2</a><span><b>Content2</b></span></li>
        </ul>
    </div>
`;
const window = new JSDOM(h).window;

const grabber = createGrabber(window);

const res = grabber.grab(sel$("#div1", {
    items: sel$("ul>li", [{
        title: sel$("a", text()),
        link: sel$("a", attr$("href")),
        content: sel$("span", html()),
    }]),
}));

for (const item of res.items) {

    // tslint:disable-next-line:no-console
    console.log("title: ", item.title, "content: " + item.content);
    // title:  Title1 content: <b>Content1</b>
    // title:  Titl2 content: <b>Content2</b>

}
