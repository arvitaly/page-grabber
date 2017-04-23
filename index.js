var _ = require('lodash');

var m = function (window) {
    var grabber = {

    }
    if (!window) {
        grabber.window = typeof (window) != "undefined" ? window : undefined;
    } else {
        grabber.window = window;
    }

    grabber.model = function (models, converts) {
        var fields = {};
        converts = converts || {};
        return {
            on: (name, callback) => {
                if (!models[name]) {
                    throw new Error("Unknown model " + name);
                }
                if (!fields[name]) {
                    fields[name] = {
                        subscribers: [callback]
                    }
                    fields[name].callback = function (data) {
                        fields[name].subscribers.map((cb) => {
                            setTimeout(() => {
                                cb(data);
                            })
                        })
                    }

                    grabber.observe(models[name], fields[name].callback, converts[name])
                } else {
                    fields[name].subscribers.push(callback);
                }

            }
        }
    }

    grabber.observe = (obj, onNewData, convert) => {
        var data
        function check() {
            var newData = grab(obj);
            if (convert) {
                newData = convert(newData);
            }
            var j = JSON.stringify(newData)
            if (JSON.stringify(data) !== j) {
                data = newData;
                onNewData(JSON.parse(j));
            }
            tick();
            if (!grabber.window.MutationObserver) {
                //TODO
            }
        }
        function tick() {
            setTimeout(check, 10);
        }
        check();
    };

    grabber._obj = function (args, context) {
        var path = args.path;
        var obj = args.obj;
        if (!context) {
            context = grabber.window;
        }

        context = _.get(context, path);

        if (!context) {
            return null;
        }
        if (_.isArray(obj)) {
            if (_.isArray(context)) {
                if (obj.length > 0) {
                    return context.map((value) => {
                        return grab(obj[0], value);
                    })
                } else {
                    return context.map((value) => {
                        return getSimpleValue(value);
                    })
                }

            }
        } else {
            if (obj) {
                return grab(obj, context)
            }
            return getSimpleValue(context);
        }
    }


    function getSimpleValue(val) {
        if (_.isNil(val)) {
            return null;
        }
        if (_.isString(val) || _.isNumber(val) || _.isBoolean(val)) {
            return val;
        }
    }

    grabber._css = function (args, el) {
        var name = args.name;
        return el.style[name] || grabber.window.getComputedStyle(el)[name];
    }

    grabber._val = function (args, el) {
        return el.value;
    }
    grabber._attr = function (args, el) {
        var name = args.name;
        return el.getAttribute(name);
    }
    grabber._hasClass = function (args, el) {
        var name = args.name;
        return strip(el.getAttribute("class")).indexOf(name) > -1;
    }

    grabber._text = function (args, el) {
        return el.innerText === undefined ? (el.textContent === undefined ? el.innerHTML.toString() : el.textContent) : el.innerText;
    }
    grabber._html = function (args, el) {
        return el.innerHTML;
    }


    grabber._child = function (args, context) {
        var index = args.index;
        var obj = args.obj;
        if (context.childNodes.length == 0 || !context.childNodes[index]) {
            return null;
        }
        return grab(obj, context.childNodes[index]);
    }

    grabber._sel = function (args, context) {
        var selector = args.selector;
        var obj = args.obj;
        if (!context) {
            context = grabber.window.document;
        }
        if (_.isArray(obj)) {
            var values = [];

            var els = context.querySelectorAll(selector);
            for (var i = 0; i < els.length; i++) {
                values.push(grab(obj[0], els[i]))
            }
            return values;
        } else {
            var el = context.querySelector(selector);
            if (!el) {
                return null;
            }
            return grab(obj, el);
        }
    }
    grabber.default = grabber;

    function grab(obj, el) {
        if (obj && obj.$$$gp) {

            return grabber[obj.$$$gp.m](obj.$$$gp, el);
        }
        if (_.isPlainObject(obj)) {
            return grabObj(obj, el)
        }
        if (_.isFunction(obj)) {
            return obj(el);
        }


        return obj;
    }
    function grabObj(obj, el) {
        var value = {};
        for (var fieldName in obj) {
            value[fieldName] = grab(obj[fieldName], el);
        }
        return value;
    }

    grabber.grab = grab;
    return grabber;
}

m.sel = function (selector, obj) {
    return { $$$gp: { m: "_sel", selector: selector, obj: obj } };
}
m.child = function (index, obj) {
    return { $$$gp: { m: "_child", index: index, obj: obj } };
}
m.text = function () {
    return { $$$gp: { m: "_text" } }
}
m.text = function () {
    return { $$$gp: { m: "_html" } }
}
m.attr = function (name) {
    return { $$$gp: { m: "_attr", name: name } }
}
m.val = function () {
    return { $$$gp: { m: "_val" } }
}
m.css = function (name) {
    return { $$$gp: { m: "_css", name: name } }
}
m.hasClass = function (name) {
    return { $$$gp: { m: "_hasClass", name: name } }
}
m.obj = function (path, obj) {
    return { $$$gp: { m: "_obj", path: path, obj: obj } }
}
function strip(value) {
    var rhtmlSpace = /[\x20\t\r\n\f]+/g;
    return (" " + value + " ").replace(rhtmlSpace, " ").slice(1, -1);
}
module.exports = m;