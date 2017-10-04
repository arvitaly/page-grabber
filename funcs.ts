export const sel: Sel = (selector: string, o: any) => {
    return { $$$gp: { m: "_sel", selector, obj: o } } as any;
};
export const sel$: Sel$ = (selector: string, o: any) => {
    return { $$$gp: { m: "_sel$", selector, obj: o } } as any;
};
export const child: Child = (index: any, o: any) => {
    return { $$$gp: { m: "_child", index, obj: o } };
};
export const child$: Child = (index: any, o: any) => {
    return { $$$gp: { m: "_child$", index, obj: o } };
};
export const text: Text = () => {
    return { $$$gp: { m: "_text" } } as any;
};
export const html: Html = () => {
    return { $$$gp: { m: "_html" } } as any;
};
export const attr: Attr = (name: string) => {
    return { $$$gp: { m: "_attr", name } } as any;
};
export const attr$: Attr = (name: string) => {
    return { $$$gp: { m: "_attr$", name } } as any;
};
export const prop: Attr = (name: string) => {
    return { $$$gp: { m: "_prop", name } } as any;
};
export const val: Val = () => {
    return { $$$gp: { m: "_val" } } as any;
};
export const css: Css = (name: string) => {
    return { $$$gp: { m: "_css", name } } as any;
};
export const hasClass: HasClass = (name: string) => {
    return { $$$gp: { m: "_hasClass", name } } as any;
};
export const nextUntil: NextUntil = (startSelector: string, stopSelector: string, selector: string, o: any) => {
    return { $$$gp: { m: "_nextUntil", startSelector, stopSelector, selector, obj: o } } as any;
};
export const nextUntil$: NextUntil$ = (startSelector: string, stopSelector: string, selector: string, o: any) => {
    return { $$$gp: { m: "_nextUntil$", startSelector, stopSelector, selector, obj: o } } as any;
};
export const obj: Obj = ((path: string, o: any) => {
    return { $$$gp: { m: "_obj", path, obj: o } } as any;
}) as any;
type ObjType = { [index: string]: any } | Array<{ [index: string]: any }> | string | boolean | null | number;
type NextUntil = <T extends ObjType>(startSelector: string, stopSelector: string, selector: string, obj: T) => T | null;
type NextUntil$ = <T extends ObjType>(startSelector: string, stopSelector: string, selector: string, obj: T) => T;
type Sel = <T extends ObjType>(selector: string, obj: T) => T | null;

type Sel$ = <T extends ObjType>(selector: string, obj: T) => T;
type Child = (index: number, el: any) => any;
type Text = () => string;
type Html = () => string;
type Val = () => string;
type Attr = (name: string) => string;
type Css = (name: string) => string;
type HasClass = (name: string) => boolean;
type Obj = <T extends ObjType>(path: string, obj?: T) => T | ((path: string) => any);
