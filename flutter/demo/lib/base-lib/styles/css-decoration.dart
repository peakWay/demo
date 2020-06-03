
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
 * align-items: center /flex-end / baseline / stretch --> CrossAxisAlignment.center / end / baseline / stretch
 * justify-content: center / flex-end / space-between / space-around -> MainAxisAlignment.center / end / spaceBetween / spaceAround (flutter 多了个值: spaceEvenly, 意为在第一个和最后元素之间均匀分布其他元素)
 * flex-wrap: wrap; --> Wrap() (Flow可以实现复杂的自定义流式布局)
 * align-content: center / flex-end; --> Wrap(crossAxisAlignment: WrapCrossAlignment.center / end)
 * flex: 1: --> Expand() / Fixible()
 */

/**
 * position: (默认relative)
 * position: absolute; --> Stack(children: <Widget>[Positioned()])
 * position: fixed; --> Stack(fit: StackFit.expand, children: <Widget>[Positioned()])  //要保证Stack的父级是整屏
 * z-index; --> 由Stack中List的排序决定(越后值越大)
 */

/**
 * 盒模型: margin, padding
 * 注: flutter中border限制在宽高内，等效与css中box-sizing: border-box;
 * margin-left/padding-left: 20px; --> margin: EdgeInsets.only(left: 20)
 * margin/padding: 20px / 0 20px / 20px 0 / 10px 20px 30px 40px --> margin/padding: EdgeInsets.all(20) / EdgeInsets.symmetric(horizontal: 20) / EdgeInsets.symmetric(vertical: 20) / EdgeInsets.fromLTRB(10, 20, 30, 40)
 */

/**
 * 字体:
 * font-size: 20px --> TextStyle(fontSize: 20.0)
 * font-weight: bold --> TextStyle(fontWeight: FontWeight.bold)
 * line-height: 1 --> Text(strutStyle: StrutStyle(height: 1; forceStrutHeight: true))  //默认值约为height: 1.3;height小于默认值不设置forceStrutHeight将无效
 * white-space: nowrap / pre / pre-wrap	; --> softWrap: false //Text()默认为自动换行，保留空白符和换行符 
 * text-align:center --> Text(textAlign: TextAlign.center)
 * letter-spaceing: 10px --> TextStyle(letterSpacing: 10)
 * text-decoration: underline / overline / line-through  red  solid; --> TextStyle(decoration: TextDecoration.underline / overline / lineThrough, decorationColor: Colors.red, decorationStyle: TextDecorationStyle.solid)
 * color: red; --> TextStyle(color: Colors.red)
 * white-space: no-wrap; text-overflow: ellipsis; overflow: hidden; --> Text(overflow: TextOverflow.ellipsis)
 */


/**
 * 背景边框阴影:
 * background-color: red; --> Container(color: Colors.red) 或 BoxDecoration(color: Colors.red)
 * background: url('img.png') no-repeat center / 100% 100%; --> BoxDecoration(image: DecorationImage(image: NetworkImage('img.png')), repeat: ImageRepeat.noRepeat, alignment: Alignment.center, fit: BoxFit.fill)
 * background: linear-gradient(to bottom, red, blue) / radial-gradient(red, blue)--> BoxDecoration(gradient: LinearGradient(begin: Alignment(0, -1.0), end: Alignment(0, 1.0), colors: [Colors.red, Colors.blue]) / radial-gradient(colors: [Colors.red, Colors.blue]))
 * border-bottom: 1px solid #000; --> border: Border(bottom: BorderSide(width: 1, style: BorderStyle.solid, color: Colors.black))
 * border: 1px solid #000; --> border: Border.all(color: Colors.black, width: 1, style: BorderStyle.solid) (flutter 新增水平或垂直方向设置: Border.symmetric(vertical: BorderSide(width: 1, style: BorderStyle.solid, color: Colors.black)))
 * border-left-radius: 20px; --> BoxDecoration(borderRadius: BorderRadius.only(topLeft: Radius.circle(10)))
 * border-radius: 20px 20px 0 0 / 20px 0 20px 0; --> BoxDecoration(borderRadius: BorderRadius.vertical(top: Radius.circle(10)) / horizontal(left: Radius.circle(10)))
 * border-radius: 10px 20px 30px 40px; --> BoxDecoration(borderRadius: BorderRadius.circle(topLeft: Radius.circle(10), topRight: Radius.circle(20), bottomRight: Radius.circle(30), bottomLeft: Radius.circle(40)))
 * border-radius: 20px; --> BoxDecoration(borderRadius: BorderRadius.circle(20) 或 BorderRadius.all(Radius.cicle(20)))
 * 
 * 注: 
 * 1.BoxFix.fill 等效 100% 100%; BoxFix.container 等效 container; BoxFix.cover 等效 BoxFix.cover 并且 background-position: center;
 * 2.background-size: 10px 10px、 background-image 多重叠加功能在flutter 中无法用DecorationImage实现
 * 3.gradient也无法多重叠加
 * 
 * 例: 
 * 1.渐变实现虚线
 * LinearGradient(begin: Alignment(-1.0, -1.0), end: Alignment(-0.96, -0.96), colors: [Colors.white, Colors.white, Colors.black, Colors.black],stops: [0, 0.5, 0.5 , 1],tileMode: TileMode.repeated)
 */

/**
 * 其他: overflow, shape
 * 
 */





