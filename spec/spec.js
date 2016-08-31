
var ipc = require('electron').ipcRenderer;
module.exports = (window) => {

    var Grabber = require('./../index');
    var grabber = Grabber(window);
    var sel = Grabber.sel;
    var attr = Grabber.attr;
    var text = Grabber.text;
    var obj = Grabber.obj;
    var child = Grabber.child;
    var model = grabber.model({
        data1: {
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
        }
    })
    model.on("data1", (data) => {
        console.log("send", data);
        ipc.send("data", data);
    })
    ipc.on("f1", () => {
        window.document.getElementById("c").innerHTML = "test20";
        window.test1 = { data: [12, { test5: "hi2", test6: "test" }, { test5: "hi" }] };
    })
}
