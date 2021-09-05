
/**
 * 枚举
 * 1. 数字枚举
 * 2. 字符串枚举
 * 3. 运行中的枚举
 * 3. 反向映射
 */

let enumSpace = (function() {
    /**
     * 1. 数字枚举
     * 数字枚举未设置值时默认为0，按顺序递增+1
     */
    enum numEnum {
        Top,
        Down,
        Left,
        Right
    }

    numEnum.Down //1

    enum numEnum1 {
        Top = 5,
        Down,
        Left,
        Right
    }
    numEnum1.Down //6

    /**
     * 2. 字符串枚举
     */
    enum stringEnum {
        Top = 'Top',
        Down = 'Down',
        Left = 'Left',
        Right = 'Right'
    }

    /**
     * 3. 运行中的枚举
     */
    enum logicEnum {
        One,
        Other
    }

    function checkEnum(value: logicEnum) {
        // if (value != logicEnum.One || value != logicEnum.Other) { //Error 枚举项不是One就是Other

        // }
    }

    function switchEnum(value: logicEnum) {
        switch(value) {
            case logicEnum.One:
                return 1
                break
            case logicEnum.Other:
                return 2 
                break
            default: 
                return 0;
        }
    }
    
    /**
     * 4. 反向映射
     * 只有数字枚举可以
     */
    enum backEnum {
        A = 1
    }

    let v = backEnum.A; //1
    const nameOfV = backEnum[v] //A


})