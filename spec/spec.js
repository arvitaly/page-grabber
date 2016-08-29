
var ipc = require('electron').ipcRenderer;
module.exports = (window) => {

    var grabber = require('./../index')(window);
    var sel = grabber.sel;
    var attr = grabber.attr;
    var text = grabber.text;
    var obj = grabber.obj;
    var child = grabber.child;
    grabber.observe({
        posts: sel("#ul > li > a", [{
            text: child(0, text()),
            link: attr("href"),
            smallText: sel("span", text())
        }]),
        data: obj("test1", {
            data: obj("data", [{
                val: obj("test5")
            }])
        })
    }, (data) => {
        console.log("send", data);
        ipc.send("data", data);
    })
    ipc.on("f1", () => {
        window.document.getElementById("c").innerHTML = "test20";
        window.test1 = { data: [12, { test5: "hi2", test6: "test" }, { test5: "hi" }] };
    })
}
