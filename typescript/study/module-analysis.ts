

/**
 * 模块解析
 * 1.相对 vs 非相对模块导入
 * 2.模块解析策略
 * (1)Classic
 * (2)Node
 * (3)Typescript(Node)
 * 3.路径映射
 * 4.跟踪模块解析
 */

/* 1. 相对 vs 非相对模块导入 */
//相对导入是以/，./或../开头的，这个路径是固定的，不会再进行额外的解析，不能导入外部模块
import CommonjsValue from './export/commonjs';

//非相对模块导入: 会相对于baseUrl，进行下文路径映射解析和模块解析策略解析，可以解析外部模块
import { parse } from 'query-string';

/* 2. 模块解析策略 */
//(1)Classic
//import CommonjsValue1 from 'commonjs';
//解析规则:从包含导入文件的目录开始依次向上级目录遍历
//1./study/export/commonjs.ts
//2./study/export/commonjs.d.ts
//3./study/commonjs.ts
//4./study/commonjs.d.ts
//5./commonjs.ts
//6./commonjs.d.ts

//(2)Node
//import QueryString from 'query-string';
//解析规则:仍然是从包含导入文件的目录开始依次向上级目录遍历node_module，但每进一个目录要进行以下3步查询
//假设有一个文件路径为 /root/src/moduleA.js，包含了一个导入var x = require("./moduleB")
//1./root/src/moduleB.js
//2./root/src/moduleB/package.json(如果指定main属性)
//3./root/src/moduleB/index.js
//上一个目录
//4./root/node_modules/moduleB.js
//5./root/node_modules/moduleB/package.json(如果指定main属性)
//6./root/node_modules/moduleB/index.js
//再上一个目录
//7./node_modules/moduleB.js
//8./node_modules/moduleB/package.json(如果指定main属性)
//9./node_modules/moduleB/index.js

//(3)Typescript
//Typescript是模仿Node运行时的解析策略来定位模块定义文件。因此，TypeScript在Node解析逻辑基础上增加了TypeScript的扩展名(.ts、.tsx和.d.ts)，Typescript在package.json里使用“types”来表示类似“main”的意义

//假设有一个文件路径为 /root/src/moduleA.ts，有一个导入语句import { b } from "./moduleB"
//1./root/src/moduleB.ts
//2./root/src/moduleB.tsx
//3./root/src/moduleB.d.ts
//4./root/src/moduleB/package.json(如果指定types属性)
//5./root/src/moduleB/index.ts
//6./root/src/moduleB/index.tsx
//7./root/src/moduleB/index.d.ts
//上一个目录
//...

//假设有一个文件路径为 /root/src/moduleA.ts，有一个导入语句import { b } from "moduleB"
//1./root/src/node_modules/moduleB.ts
//2./root/src/node_modules/moduleB.tsx
//3./root/src/node_modules/moduleB.d.ts
//4./root/src/node_modules/moduleB/package.json(如果指定types属性)
//5./root/src/node_modules/moduleB/index.ts
//6./root/src/node_modules/moduleB/index.tsx
//7./root/src/node_modules/moduleB/index.d.ts
//上一个目录
//...


/* 3. 路径映射 */
//若在tsconfig.json设置映射'export/*'则不会报错
// import CommonjsValue from 'commonjs';

/* 4. 跟踪模块解析 */
// 命令：tsc --traceResolution
// --moduleResolution选项默认是Classic，由于模块策略是Classic，那么外部模块导入就无法找到
// --moduleResolution改成Node就能解析外部模块了
