### 接口/对象字面量的属性
在使用in遍历接口/对象字面量的属性时，本质上遍历的是字符串字面量。  
当在遍历时向过滤某些属性时，可以in中使用as类型断言成never


### 数组
- T[number]直接生成数组项组成的联合类型，存在子集关系的项会使用父集类型
- [infer E, ...T] E代表的是第一个元素类型， T为其他元素（any）
- [infer E, ...infer R] E代表第一个元素类型，R为剩余类型组成的数组
- 数组的length属性是个数值字面量

### 对象
- 必选属性与可选属性、readonly属性之间的转换是通过-?、-readonly转换，但是这种转换是全属性都会转，如果需要保留部分属性的原始状态还需要使用交叉类型
- 如果属性左边as never相当于剔除该属性
- 将key转换成另一个对象的属性字符串，可以通过{[P in keyof {key: key} as \`${key}\`]: any}这种方式

### 联合类型
- 使用[]包裹联合类型使用extends就不会分发

### never
- never类型不能扩展never类型，但是 never[] 可以扩展 never[]

### 链式调用
1. 对象链式
一般链式调用联想到的是js中的return this这种思路，在ts中也是类似的，以下面这种方式为例
```tsx
type C<T> = {
    func(): C<T & {'a': string}>
}
```

2. 元组链式
使用个空数组占位，比如Repeat实例
```tsx
type Repeat<T, C extends number, A extends any[] = []> = A['length'] extends C 
    ? A 
    : Repeat<T, C, [...A, T]>
```

### 数值操作
1. 基本上和数量有关的运算都可以考虑借用空数组占位


### 如何判断any
any & 除never以外的值都为any, 任何值都是 any的子集