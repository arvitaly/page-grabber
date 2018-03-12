"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var Sizzle = require("./sizzle");
var _ = require("lodash");
__export(require("./funcs"));
var Grabber = /** @class */ (function () {
    function Grabber(w) {
        this.window = w ? w : window;
        this.$ = Sizzle(this.window);
    }
    /*public model(models: any, converts: any) {
        const fields: { [index: string]: any } = {};
        converts = converts || {};
        return {
            on: (name: string, callback: any) => {
                if (!models[name]) {
                    throw new Error("Unknown model " + name);
                }
                if (!fields[name]) {
                    fields[name] = {
                        subscribers: [callback],
                    };
                    fields[name].callback = (data: any) =>
                        fields[name].subscribers.map((cb: any) => setTimeout(() => cb(data)));
                    this.observe(models[name], fields[name].callback, converts[name]);
                } else {
                    fields[name].subscribers.push(callback);
                }
            },
        };
    }*/
    Grabber.prototype.observe = function (obj, onNewData, convert) {
        var _this = this;
        var data;
        var check = function () {
            var newData = _this.grab(obj);
            if (convert) {
                newData = convert(newData);
            }
            var j = JSON.stringify(newData);
            if (JSON.stringify(data) !== j) {
                data = newData;
                onNewData(JSON.parse(j));
            }
            tick();
            /*if (!(this.window.MutationObserver) {
                // TODO
            }*/
        };
        function tick() {
            setTimeout(check, 10);
        }
        check();
    };
    Grabber.prototype.grab = function (o, el) {
        var obj = o;
        if (obj && obj.$$$gp) {
            return this[obj.$$$gp.m.substr(1)](obj.$$$gp, el);
        }
        if (_.isPlainObject(obj)) {
            return this.grabObj(obj, el);
        }
        if (_.isFunction(obj)) {
            return obj(el);
        }
        return obj;
    };
    Grabber.prototype.obj = function (args, context) {
        var _this = this;
        var path = args.path;
        var obj = args.obj;
        if (!context) {
            context = this.window;
        }
        context = _.get(context, path);
        if (!context) {
            return null;
        }
        if (_.isArray(obj)) {
            if (_.isArray(context)) {
                if (obj.length > 0) {
                    return context.map(function (value) { return _this.grab(obj[0], value); });
                }
                else {
                    return context.map(function (value) { return getSimpleValue(value); });
                }
            }
        }
        else {
            if (obj) {
                return this.grab(obj, context);
            }
            return getSimpleValue(context);
        }
    };
    Grabber.prototype.grabObj = function (obj, el) {
        var value = {};
        for (var fieldName in obj) {
            value[fieldName] = this.grab(obj[fieldName], el);
        }
        return value;
    };
    Grabber.prototype.sel = function (args, context) {
        var selector = args.selector;
        var obj = args.obj;
        if (!context) {
            context = this.window.document;
        }
        if (_.isArray(obj)) {
            var values = [];
            var els = this.$(selector, context);
            for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
                var el = els_1[_i];
                values.push(this.grab(obj[0], el));
            }
            return values;
        }
        else {
            var el = this.$(selector, context)[0];
            if (!el) {
                return null;
            }
            return this.grab(obj, el);
        }
    };
    Grabber.prototype.sel$ = function (args, context) {
        var res = this.sel(args, context);
        if (res === null) {
            throw new Error("Not found element by selector " + args.selector);
        }
        return res;
    };
    Grabber.prototype.css = function (args, el) {
        var name = args.name;
        return el.style[name] || this.window.getComputedStyle(el)[name];
    };
    Grabber.prototype.val = function (__, el) {
        return el.value;
    };
    Grabber.prototype.attr$ = function (args, el) {
        var res = this.attr(args, el);
        if (res === null) {
            throw new Error("Attribute `" + args.name + "` should be non-empty");
        }
        return res;
    };
    Grabber.prototype.attr = function (args, el) {
        var res = el.getAttribute(args.name);
        if (res === "") {
            return null;
        }
        return res;
    };
    Grabber.prototype.prop = function (args, el) {
        return el[args.name];
    };
    Grabber.prototype.hasClass = function (args, el) {
        return strip(el.getAttribute("class")).indexOf(args.name) > -1;
    };
    Grabber.prototype.text = function (__, el) {
        return el.innerText === undefined ?
            (el.textContent === undefined ? el.innerHTML.toString() : el.textContent) : el.innerText;
    };
    Grabber.prototype.html = function (__, el) {
        return el.innerHTML;
    };
    Grabber.prototype.child = function (args, context) {
        var index = args.index;
        var obj = args.obj;
        if (context.childNodes.length === 0 || !context.childNodes[index]) {
            return null;
        }
        return this.grab(obj, context.childNodes[index]);
    };
    Grabber.prototype.child$ = function (args, context) {
        var res = this.child(args, context);
        if (res === null) {
            throw new Error("Not found element by index " + args.index);
        }
        return res;
    };
    Grabber.prototype.nextUntil = function (args, context) {
        var startSelector = args.startSelector;
        var obj = args.obj;
        if (!context) {
            context = this.window.document;
        }
        var nextEl = this.$(startSelector)[0];
        if (!nextEl) {
            return null;
        }
        var stopEl = this.$(startSelector + " ~ " + args.stopSelector, context)[0];
        var allEls = [];
        // tslint:disable-next-line:no-conditional-assignment
        while (nextEl = nextEl.nextSibling) {
            if (stopEl === nextEl) {
                break;
            }
            allEls.push(nextEl);
        }
        var els = this.$(startSelector + " ~ " + args.selector, context, null, allEls);
        if (_.isArray(obj)) {
            var values = [];
            for (var _i = 0, els_2 = els; _i < els_2.length; _i++) {
                var el = els_2[_i];
                values.push(this.grab(obj[0], el));
            }
            return values;
        }
        else {
            var el = els[0];
            if (!el) {
                return null;
            }
            return this.grab(obj, el);
        }
    };
    Grabber.prototype.nextUntil$ = function (args, context) {
        var res = this.nextUntil(args, context);
        if (res === null) {
            throw new Error("Not found element by selector " + args.selector +
                ", start selector " + args.startSelector
                + ", stop selector " + args.stopSelector);
        }
        return res;
    };
    return Grabber;
}());
exports.Grabber = Grabber;
function getSimpleValue(val) {
    if (_.isNil(val)) {
        return null;
    }
    if (_.isString(val) || _.isNumber(val) || _.isBoolean(val)) {
        return val;
    }
    return val;
}
exports.getSimpleValue = getSimpleValue;
function strip(value) {
    var rhtmlSpace = /[\x20\t\r\n\f]+/g;
    return (" " + value + " ").replace(rhtmlSpace, " ").slice(1, -1);
}
exports.strip = strip;
exports.default = function (window) { return new Grabber(window); };
