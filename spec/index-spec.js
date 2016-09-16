var electron = require('electron');
var win;
var test;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
describe("dom grabber", () => {
    beforeAll((done) => {
        electron.app.on('ready', () => {
            win = new electron.BrowserWindow({ width: 800, height: 600 })
            win.webContents.on('dom-ready', () => {
                electron.ipcMain.on("data", (e, data) => {
                    test = data;
                })
                setTimeout(() => {
                    win.webContents.executeJavaScript("require(" + JSON.stringify(__dirname + "/spec.js") + ")(window)");
                    done();
                }, 100)


            })
            win.loadURL("file://" + __dirname + "/grab1.html");
            win.openDevTools();
        })
    })
    it("observe", (done) => {
        setTimeout(() => {
            expect(test).toEqual({
                data: {
                    data: [
                        { val: null },
                        { val: null },
                        { val: "hi" }
                    ]
                },
                posts: [
                    {
                        text: "text2", "link": "link3",
                        display: "block",
                        active: true,
                        smallText: "test18"
                    },
                    {
                        text: "text1",
                        "link": "link5",
                        active: false,
                        "display": "inline",
                        smallText: null
                    }
                ]
            });
            win.webContents.send("f1")
            setTimeout(() => {
                expect(test).toEqual({
                    data:
                    {
                        data:
                        [
                            { val: null }, { val: "hi2" }, { val: "hi" }
                        ]
                    },
                    posts: [
                        {
                            text: "text2",
                            display: "block",
                            active: true,
                            "link": "link3", smallText: "test20"
                        },
                        {
                            text: "text1",
                            active: false,
                            display: "inline",
                            "link": "link5", smallText: null
                        }]
                });
                done();
            }, 400)
        }, 400)
    })
})