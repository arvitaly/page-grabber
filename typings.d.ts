declare namespace PageGrabber {
    interface GrabberO {

    }
    export function sel(selector, obj): GrabberO;
    export function child(index: number, el): GrabberO;
    export function text(): GrabberO;
    export function attr(name: string): GrabberO;
    export function css(name: string): GrabberO;
    export function hasClass(name: string): GrabberO;
    export function obj(path: string, obj?: any): GrabberO;
}
declare function PageGrabber(window): {
    observe: (obj: PageGrabber.GrabberO, onNewData: (data: any) => any, convert?: Function) => void;
    model: (models: { [index: string]: PageGrabber.GrabberO }, converts: { [index: string]: Function }) => {
        on: (name, cb: (data: any) => any) => void
    };
    grab: (obj: PageGrabber.GrabberO, el: any) => any;
}
export = PageGrabber;