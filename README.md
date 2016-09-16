# page-grabber [![Build Status](https://travis-ci.org/arvitaly/page-grabber.svg?branch=master)](https://travis-ci.org/arvitaly/page-grabber)
Util for grab data from web-page. Grabber take schema for data and look Window-tree by it. 

# Example observe

    var grabber = require('page-grabber')(window);

    //Helpers for create data schema
    var sel = grabber.sel; //Set context for selector
    var attr = grabber.attr; //Get attribute value
    var css = grabber.attr; //Get computed style
    var hasClass = grabber.hasClass //check if class exists in class="...class1..."//boolean
    var text = grabber.text; //Get textContent value
    var obj = grabber.obj; //Set context for JS-object
    var child = grabber.child; //Set context for childNodes by index
    ////////////////////////////////
    var model = grabber.model({
        posts: sel("#ul > li > a", [{
            text: child(0, text()),
            display: css("display"),
            active: hasClass("active"),
            link: attr("href"),
            smallText: sel("span", text())
        }]),
        data1: obj("test1", {
            data: obj("data", [{
                val: obj("test5")
            }])
        })
    })
    model.on("posts", (data)=>{
        console.log("posts", data);
    })
    model.on("data1", (data)=>{
        console.log("data1", data);
    })    