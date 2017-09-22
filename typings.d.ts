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
    export function prop(name: string): string;
    export function css(name: string): string;
    export function hasClass(name: string): boolean;
    export function obj<T extends { [index: string]: any }>(path: string, obj: T): T;
    export function obj<T extends Array<{ [index: string]: any }>>(path: string, obj: T): T;
    export function obj(path: string): any;
    type ObjType = { [index: string]: any } | Array<{ [index: string]: any }> | string | null;
    type NextUntil = <T extends ObjType>(startSelector: string, stopSelector: string, selector: string, obj: T) => T | null;
    export const nextUntil: NextUntil;
}
declare function PageGrabber(window: Window): {
    observe: (obj: PageGrabber.GrabberO, onNewData: (data: any) => any, convert?: Function) => void;
    model: (models: { [index: string]: PageGrabber.GrabberO }, converts?: { [index: string]: Function }) => PageGrabber.IModel;
    grab: <T>(obj: T, el: any) => T;
    $: (sel: string, context?: any) => HTMLElement[];
}
export = PageGrabber;