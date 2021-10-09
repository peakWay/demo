
/* 外部模块简写 */
// declare module "query-string";

/* 外部模块 */
declare module "query-string" {
    export function parse(url: string);

    let querystring: any;
    export default querystring;
}

/* 模块声明通配符 */
//导入非javascript内容
declare module "*!text" {
    const content: string; 
    export default content;
}
