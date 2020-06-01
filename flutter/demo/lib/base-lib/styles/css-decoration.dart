
/**
 * css 与 decoration
 * Decoration 常用两种子类:
 * 1. BoxDecoration
 * 2. ShapeDecoration
 * 
 * 格式
 * css --> decoration 
 */

/**
 * flex:
 * display: flex; --> Row()
 * flex-direction: column; --> Column()
 * align-items: center/flex-end/baseline/stretch --> CrossAxisAlignment.center/end/baseline/stretch
 * justify-content: center/flex-end/space-between/space-around -> MainAxisAlignment.center/end/spaceBetween/spaceAround (flutter 多了个值: spaceEvenly, 意为在第一个和最后元素之间均匀分布其他元素)
 * flex-wrap: wrap; --> Wrap() (Flow可以实现复杂的自定义流式布局)
 * align-content: center/flex-end; --> Wrap(crossAxisAlignment: WrapCrossAlignment.center/end)
 * flex: 1: --> Expand()/Fix
 */

/**
 * position: (默认relative)
 * position: absolute; --> Stack(children: <Widget>[Positioned()])
 * position: fixed; --> Stack(fit: StackFit.expand, children: <Widget>[Positioned()])  //要保证Stack的父级是整屏
 * z-index; --> 由Stack中List的排序决定(越后值越大)
 */

/**
 * 盒模型: margin, padding, border
 * 注: flutter中border限制在宽高内，等效与css中box-sizing: border-box;
 * margin-left/padding-left: 20px; --> margin: EdgeInsets.only(left: 20)
 * margin/padding: 20px / 0 20px / 20px 0 / 10px 20px 30px 40px --> margin: EdgeInsets.all(20) / EdgeInsets.symmetric(horizontal: 20) / EdgeInsets.symmetric(vertical: 20) / EdgeInsets.fromLTRB(10, 20, 30, 40)
 * border-bottom: 1px solid #000 --> border: Border(bottom: BorderSide(width: 1, style: BorderStyle.solid, color: Colors.black))
 * border: 1px solid #000 --> border: Border.all(color: Colors.black, width: 1, style: BorderStyle.solid) (flutter 新增水平或垂直方向设置: Border.symmetric(vertical: BorderSide(width: 1, style: BorderStyle.solid, color: Colors.black)))
 */

/**
 * 字体:
 * font-size: 
 */



