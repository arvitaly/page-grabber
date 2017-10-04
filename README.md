# page-grabber

Util for grab data from web-page

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

## Install

    npm install page-grabber --save

    or yarn add page-grabber

## Usage

    import { JSDOM } from "jsdom";
    import createGrabber, { attr$, html, sel$, text } from "page-grabber";

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
        console.log("title: ", item.title, "content: " + item.content);
        // title:  Title1 content: <b>Content1</b>
        // title:  Titl2 content: <b>Content2</b>
    }

## API

    attr(name: string) => string | null - get attribute by name
    attr$(name: string) => string - get attribute by name with check for non-empty

## Test

    npm install
    npm test

[npm-image]: https://badge.fury.io/js/page-grabber.svg
[npm-url]: https://npmjs.org/package/page-grabber
[travis-image]: https://travis-ci.org/arvitaly/page-grabber.svg?branch=master
[travis-url]: https://travis-ci.org/arvitaly/page-grabber
[daviddm-image]: https://david-dm.org/arvitaly/page-grabber.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/arvitaly/page-grabber
[coveralls-image]: https://coveralls.io/repos/arvitaly/page-grabber/badge.svg
[coveralls-url]: https://coveralls.io/r/arvitaly/page-grabber