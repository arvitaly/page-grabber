const Sizzle = require("./sizzle");
import _ = require("lodash");
export * from "./funcs";

class Grabber {
    public $: any;
    public window: Window;
    constructor(w?: Window) {
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
    public observe(obj: any, onNewData: any, convert?: any) {
        let data: any;
        const check = () => {
            let newData = this.grab(obj);
            if (convert) {
                newData = convert(newData);
            }
            const j = JSON.stringify(newData);
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
    }
    public grab(obj: any, el?: any) {
        if (obj && obj.$$$gp) {
            return (this as any)[obj.$$$gp.m.substr(1)](obj.$$$gp, el);
        }
        if (_.isPlainObject(obj)) {
            return this.grabObj(obj, el);
        }
        if (_.isFunction(obj)) {
            return obj(el);
        }
        return obj;
    }
    protected obj(args: { path: string; obj: any }, context: any) {
        const path = args.path;
        const obj = args.obj;
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
                    return context.map((value) => this.grab(obj[0], value));
                } else {
                    return context.map((value) => getSimpleValue(value));
                }
            }
        } else {
            if (obj) {
                return this.grab(obj, context);
            }
            return getSimpleValue(context);
        }
    }
    protected grabObj(obj: any, el: any) {
        const value: { [index: string]: any } = {};
        for (const fieldName in obj) {
            value[fieldName] = this.grab(obj[fieldName], el);
        }
        return value;
    }
    protected sel(args: { selector: string; obj: any }, context: any) {
        const selector = args.selector;
        const obj = args.obj;
        if (!context) {
            context = this.window.document;
        }
        if (_.isArray(obj)) {
            const values = [];
            const els = this.$(selector, context);
            for (const el of els) {
                values.push(this.grab(obj[0], el));
            }
            return values;
        } else {
            const el = this.$(selector, context)[0];
            if (!el) {
                return null;
            }
            return this.grab(obj, el);
        }
    }
    protected sel$(args: { selector: string; obj: any }, context: any) {
        const res = this.sel(args, context);
        if (res === null) {
            throw new Error("Not found element by selector " + args.selector);
        }
        return res;
    }
    protected css(args: { name: string }, el: any) {
        const name = args.name;
        return el.style[name] || (this.window.getComputedStyle(el) as any)[name];
    }
    protected val(_: {}, el: any) {
        return el.value;
    }
    protected attr$(args: { name: string }, el: any) {
        const res = this.attr(args, el);
        if (res === null) {
            throw new Error("Attribute `" + args.name + "` should be non-empty");
        }
        return res;
    }
    protected attr(args: { name: string }, el: any) {
        const res = el.getAttribute(args.name);
        if (res === "") {
            return null;
        }
        return res;
    }
    protected prop(args: { name: string }, el: any) {
        return el[args.name];
    }
    protected hasClass(args: { name: string }, el: any) {
        return strip(el.getAttribute("class")).indexOf(args.name) > -1;
    }
    protected text(_: {}, el: HTMLElement) {
        return el.innerText === undefined ?
            (el.textContent === undefined ? el.innerHTML.toString() : el.textContent) : el.innerText;
    }
    protected html(_: {}, el: HTMLElement) {
        return el.innerHTML;
    }
    protected child(args: { index: number; obj: any }, context: any) {
        const index = args.index;
        const obj = args.obj;
        if (context.childNodes.length === 0 || !context.childNodes[index]) {
            return null;
        }
        return this.grab(obj, context.childNodes[index]);
    }
    protected child$(args: { index: number; obj: any }, context: any) {
        const res = this.child(args, context);
        if (res === null) {
            throw new Error("Not found element by index " + args.index);
        }
        return res;
    }
    protected nextUntil(
        args: {
            startSelector: string;
            selector: string;
            obj: any; stopSelector: string
        },
        context: any,
    ) {
        const startSelector = args.startSelector;
        const obj = args.obj;
        if (!context) {
            context = this.window.document;
        }
        let nextEl = this.$(startSelector)[0];
        if (!nextEl) {
            return null;
        }
        const stopEl = this.$(startSelector + " ~ " + args.stopSelector, context)[0];
        const allEls = [];
        // tslint:disable-next-line:no-conditional-assignment
        while (nextEl = nextEl.nextSibling) {
            if (stopEl === nextEl) {
                break;
            }
            allEls.push(nextEl);
        }
        const els = this.$(startSelector + " ~ " + args.selector, context, null, allEls);
        if (_.isArray(obj)) {
            const values = [];
            for (const el of els) {
                values.push(this.grab(obj[0], el));
            }
            return values;
        } else {
            const el = els[0];
            if (!el) {
                return null;
            }
            return this.grab(obj, el);
        }
    }
    protected nextUntil$(
        args: {
            startSelector: string;
            selector: string;
            obj: any; stopSelector: string
        },
        context: any,
    ) {
        const res = this.nextUntil(args, context);
        if (res === null) {
            throw new Error("Not found element by selector " + args.selector +
                ", start selector " + args.startSelector
                + ", stop selector " + args.stopSelector);
        }
        return res;
    }
}
export function getSimpleValue(val: any) {
    if (_.isNil(val)) {
        return null;
    }
    if (_.isString(val) || _.isNumber(val) || _.isBoolean(val)) {
        return val;
    }
    return val;
}
export function strip(value: string) {
    const rhtmlSpace = /[\x20\t\r\n\f]+/g;
    return (" " + value + " ").replace(rhtmlSpace, " ").slice(1, -1);
}
export default (window: Window) => new Grabber(window);
