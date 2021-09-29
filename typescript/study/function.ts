
/**
 * 函数
 * 1. 参数
 * 2. this
 * 3. 重载
 */

const functionSpace = (function() {
    /**
     * 1. 参数
     * 可选参数
     * 默认值
     * 剩余参数
     */
    //可选参数
    function buildName(x: string, y?: string) {

        return `${x}${y}`
    } 

    buildName('oldman');  

    //默认值
    function defaultBuildName(x = 'oldman', y?: string) {
        return `${x}${y}`
    }

    function restBuildName(first: string, ...rest: string[]) {
        return `${first}${rest.join('')}`
    }

    /**
     * 2. this
     * tsConfig选项设置noImplicitThis为true
     */

    //this类型为any
    let o = {
        name: 'oldman',
        getName: function() {
            return function() {
                // console.log(this.name)  //Error
            }
        }
    }

    //this类型为字面量对象
    let o1 = {
        name: 'oldman',
        getName: function() {
            return () => {
                console.log(this.name)
            }
        }
    }

    /**
     * 重载
     */
    let options = ['北京', '上海', '广州', '深圳']
    function pickCity(x: string[]) : number;
    function pickCity(x: number): string;
    function pickCity(x): any {
        if (typeof x === 'object') {
            return Math.random() * x.length
        } else if (typeof x === 'number') {
            return options[x]
        }
    }

    pickCity(['上海'])
    pickCity(1)
})()