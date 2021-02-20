
declare module 'querystring' {
    export function stringify(val: object): string
    export function parse(val: string): object
}