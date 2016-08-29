var _ = require('lodash');

var m = function (window) {
    var grabber = {

    }
    if (!window) {
        grabber.window = typeof (window) != "undefined" ? window : undefined;
    } else {
        grabber.window = window;
    }


    grabber.observe = (obj, onNewData) => {
        var data
        function check() {
            var newData = grab(obj);
            if (JSON.stringify(data) !== JSON.stringify(newData)) {
                data = newData;
                onNewData(data);
            }
            tick();
            if (!grabber.window.MutationObserver) {
                //TODO
            }
        }
        function tick() {
            setTimeout(check, 30);
        }
        check();
    };

    grabber.obj = function (path, obj) {
        return function (context) {
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
    }

    function getSimpleValue(val) {
        if (_.isNil(val)) {
            return null;
        }
        if (_.isString(val) || _.isNumber(val) || _.isBoolean(val)) {
            return val;
        }
    }

    grabber.attr = function (name) {
        return function (el) {
            return el.getAttribute(name);
        }
    }
    grabber.text = function () {
        return function (el) {
            return el.innerText === undefined ? (el.textContent === undefined ? el.innerHTML.toString() : el.textContent) : el.innerText;
        }
    }
    grabber.child = function (index, obj) {
        return function (context) {
            if (context.childNodes.length == 0 || !context.childNodes[index]) {
                return null;
            }
            return grab(obj, context.childNodes[index]);
        }
    }
    grabber.sel = function (selector, obj) {
        return function (context) {
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
    }
    grabber.default = grabber;

    function grab(obj, el) {
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
    return grabber;
}
module.exports = m;