declare namespace PageGrabber {
    interface GrabberO {

    }
    interface IModel {
        on: (name: string, cb: (data: any) => any) => void
    }
    export function sel<T extends { [index: string]: any }>(selector: string, obj: T): T | null;
    export function sel<T extends Array<{ [index: string]: any }>>(selector: string, obj: T): T;
    export function sel<T extends string>(selector: string, obj: T): T | null;
    export function child(index: number, el: any): GrabberO;
    export function text(): string;
    export function html(): string;
    export function val(): string;
    export function attr(name: string): string;
    export function css(name: string): string;
    export function hasClass(name: string): boolean;
    export function obj<T extends { [index: string]: any }>(path: string, obj?: T): T;
}
declare function PageGrabber(window: Window): {
    observe: (obj: PageGrabber.GrabberO, onNewData: (data: any) => any, convert?: Function) => void;
    model: (models: { [index: string]: PageGrabber.GrabberO }, converts?: { [index: string]: Function }) => PageGrabber.IModel;
    grab: (obj: PageGrabber.GrabberO, el: any) => any;
}
export = PageGrabber;