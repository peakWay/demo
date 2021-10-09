/**
 * 导入
 * 1. 内部导入
 * 2. 外部模块导入
 */


/* 内部导入 */
import CommonjsValue from './export/commonjs';
console.log(CommonjsValue)

/* 外部模块 */
// import QueryString from 'query-string';
import { parse } from 'query-string';
let query = parse('http://baidu.com?token=123');



