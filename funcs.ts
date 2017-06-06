export function sel(selector: string, obj: any) {
    return { $$$gp: { m: "_sel", selector, obj } };
}
export function child(index: any, obj: any) {
    return { $$$gp: { m: "_child", index, obj } };
}
export function text() {
    return { $$$gp: { m: "_text" } };
}
export function html() {
    return { $$$gp: { m: "_html" } };
}
export function attr(name: string) {
    return { $$$gp: { m: "_attr", name } };
}
export function val() {
    return { $$$gp: { m: "_val" } };
}
export function css(name: string) {
    return { $$$gp: { m: "_css", name } };
}
export function hasClass(name: string) {
    return { $$$gp: { m: "_hasClass", name } };
}
export function obj(path: string, obj: any) {
    return { $$$gp: { m: "_obj", path, obj } };
}
