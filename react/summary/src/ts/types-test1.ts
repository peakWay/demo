// import MyFunction from 'ts-type-demo';


// import { showToast } from '@yt/YTUI';

/**
 * 声明文件放在哪
 * 1. 目录 src/@types/，在 src 目录新建 @types 目录，在其中编写 .d.ts 声明文件，声明文件会自动被识别，可以在此为一些没有声明文件的模块编写自己的声明文件，实际上在 tsconfig.json 中 include 字段包含的范围内编写 .d.ts，都将被自动识别；
 * 2. 与被声明的 js 文件同级目录内，创建相同名称的 .d.ts 文件，这样也会被自动识别；
 * 3. 设置 package.json 中的 typings 属性值，如 ./index.d.ts. 这样系统会识别该地址的声明文件。同样当我们把自己的js库发布到 npm 上时，按照该方法绑定声明文件。
 * 4. 同过 npm 模块安装，如 @type/react ，它存放在 node_modules/@types/ 路径下。
 */

import react from "react";
// import { baseInfo, routePrefix } from "ts-type-demo";
import YTUI1 from '@yt/YTUI';
// import MyFunction from "ts-type-demo";
// import MyFunction from "ts-type-demo";
// import Request from '@yt/request';


//类型1
console.log(ft);

//类型2
//有tsconfig的时候就报错，若在file选项中加入该文件路径则正常；
// console.log(DirDefinition);

//类型3
// publicPrefix

// let aaa: baseInfo.BaseType = {name: 's'};
// let a: CustomTyping = 'type1';
// var b: HttpResDataBaseProps<null>
let d = window
// let c = 1;
// c.toBinaryString
// let e: MyFunction.LengthReturnType
YTUI1.EmptyHolder
YTUI1.showToast('sdsd')

//类型4
console.log(react);

