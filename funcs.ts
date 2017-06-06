export const sel: sel = (selector: string, obj: any) => {
    return { $$$gp: { m: "_sel", selector, obj } };
}
export const child: child = (index: any, obj: any) => {
    return { $$$gp: { m: "_child", index, obj } };
}
export const text: text = () => {
    return { $$$gp: { m: "_text" } } as any;
}
export const html: html = () => {
    return { $$$gp: { m: "_html" } } as any;
}
export const attr: attr = (name: string) => {
    return { $$$gp: { m: "_attr", name } } as any;
}
export const val: val = () => {
    return { $$$gp: { m: "_val" } } as any;
}
export const css: css = (name: string) => {
    return { $$$gp: { m: "_css", name } } as any;
}
export const hasClass: hasClass = (name: string) => {
    return { $$$gp: { m: "_hasClass", name } } as any;
}
export const obj: obj = ((path: string, obj: any) => {
    return { $$$gp: { m: "_obj", path, obj } } as any;
}) as any;
interface sel {
    <T extends { [index: string]: any }>(selector: string, obj: T): T | null
};
interface sel {
    <T extends Array<{ [index: string]: any }>>(selector: string, obj: T): T
};
interface sel {
    <T extends string>(selector: string, obj: T): T | null
};
interface child {
    (index: number, el: any): any
};
interface text {
    (): string
};
interface html {
    (): string
};
interface val {
    (): string
};
interface attr {
    (name: string): string
};
interface css {
    (name: string): string
};
interface hasClass {
    (name: string): boolean
};
interface obj {
    <T extends { [index: string]: any }>(path: string, obj: T): T
};
interface obj {
    <T extends Array<{ [index: string]: any }>>(path: string, obj: T): T
};
interface obj {
    (path: string): any
};