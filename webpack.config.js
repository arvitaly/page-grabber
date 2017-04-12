module.exports = {
    target: "web",
    entry: './index.js',
    output: {
        path: __dirname + "/dist",
        filename: 'page-grabber.js',
        library: 'PageGrabber',
        libraryTarget: 'var'
    },
}
