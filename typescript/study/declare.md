
# 声明文件

## TS的核心
TS所有声明都可以分为两种：类型与值

### 类型
声明为类型的有以下几种：
- interface声明
- type声明
- enum{}声明
- class{}声明(实例部分)
- import导入类型的声明

### 值
声明为值的有以下几种：
- var、const、let声明
- namespace或module声明（内部包含值声明）
- enum声明
- class声明(构造函数部分)
- function声明
- import导入值的声明

## 内部声明
ts/d.ts文件会根据是否使用export/import来判断该文件是模块声明还是全局声明。即如果引用任何一个export/import，那么该文件的所有未导出的声明都无法被其他文件直接引用。如果该文件所有的声明都未导出，那么可以在项目所有文件中直接引用这些声明，不需要导入。所以模块声明与全局声明不应该放在一个文件中。但值声明只能在d.ts文件并用declare声明值才能被其他文件直接引用

## 外部库声明
### 结构    
声明文件主要有三种结构 
- 全局库
- 模块化库
- UMD库

#### 全局库
全局库的特征一般为顶级var语句与function声明，顶级声明不能有export(namespace中可以)或者其他模块加载器。
项目可以通过script直接引入，也能通过npm引入，但是需要加///<reference types="moduleName">引入该库的声明文件

```typescript
declare var baseInfo: any;
declare function MyFunction(name: string): NamedReturnType; 

interface NamedReturnType {
    firstName: string;
    secondName: string;
}
```

#### 模块化库
模块化库的特征一般会有import或者export的顶级声明，或者require、define、exports、module.exports等其他模块规范
```typescript
export function FunctionA(name: string){}

export function FunctionB(arr: Array){}

export interface BaseProps<T> { payload: T }
```

#### UMD库
UMD库中一般都有两个特征
1. export as namespace myLib相当于在创建一个myLib的全局变量
2. export= MyLib实现模块导出
```typescript
export = React;
export as namespace React;

declare namespace React {
    type ReactNode = ReactElement | ReactFragment | null | undefined | boolean;
    const Children: ReactChildren;
}
```

### 导入
外部库有三种方式指定import导入的声明
- 包含声明文件到你的npm包
- 发布到@types
- 在项目中通过declare module声明

#### 包含声明文件到你的npm包
在npm包package.json中可以通过"types"或"typings"指定声明文件。

如果npm包的声明有来源于依赖包，那需要在package.json中的"dependencies"中指定。并通过///<reference types="**">引入依赖的声明文件。


#### 发布到@types
当想要把声明文件与npm包分开时，可以使用这种方式

因为在项目中会默认编译node_modules/@types中所有声明文件。除非通过tsconfig.json中的"types","typeRoots"进行设置

#### 在项目中通过declare module声明
如果npm包没有通过上面两种方式的引入声明文件，那么你需要在项目中声明
//global.d.ts
```typescript
declare module '**' {
   prop: any;
   function sayHi(text: string): void;
   export { prop, sayHi }; 
}
```





