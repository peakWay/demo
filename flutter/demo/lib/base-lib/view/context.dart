import 'package:flutter/material.dart';

/**
 * BuildContext context
 * 操作上下文:
 * 1.获取父级State(context.findAncestorStateOfType<_FatherWidgetState>())
 * 2.获取父级Widget(context.findAncestorWidgetOfExactType<FatherWidget>())
 * 3.Provider共享状态实现
 */

class CommonData extends ChangeNotifier{
  CommonData({this.name});

  String name;
}

/* 获取父级状态 */
class FatherWidget extends StatefulWidget {
  FatherWidget({
    this.widgetArg = 1,
  });

  final int widgetArg;
  // final CommonData data;
  final data = {'name': 'oldman'};

  static FatherWidget of<FatherWidget>(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<InheritedProvider<FatherWidget>>().data;
    // return provider;
  }

  @override
  _FatherWidgetState createState() => _FatherWidgetState();
}

class _FatherWidgetState extends State<FatherWidget> {
  int stateArg = 2;
  Color color = Colors.yellow;

  @override
  void initState() {
    super.initState();
  }

  void _changeColor() {
    setState(() {
      color = color == Colors.yellow ? Colors.lightBlue : Colors.yellow;
    });
  }

  

  @override
  Widget build(BuildContext context) {
    
    return InheritedProvider<FatherWidget>(
      child: Container(
        width: 200,
        height: 200,
        color: color,
        child: Column(
          children: <Widget>[
            Text('Father \n widgetArg: ${widget.widgetArg}; stateArg: $stateArg;'),

            ChildrenWidget()
          ],
        ),
      ),
      data: widget
    );
  }
}

class ChildrenWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {

    //通过通用方法获取最近的父级状态
    _FatherWidgetState _fatherState = context.findAncestorStateOfType<_FatherWidgetState>(); 
    FatherWidget _fatherWidget = context.findAncestorWidgetOfExactType<FatherWidget>();

    //通过自定义of方法有意向的共享状态
    print('${FatherWidget.of<FatherWidget>(context).widgetArg}');
    
    return Column(
      children: <Widget>[
        Container(
          margin: EdgeInsets.only(top: 30),
          child: Text('Child 获取父级的状态 \n fatherStateArg: ${_fatherWidget.widgetArg};fatherStateArg: ${_fatherState.stateArg}'),
        ),
        RaisedButton(
          child: Text('切换父级颜色'),
          onPressed: _fatherState._changeColor
        )
      ],
    );
  }
}
/* 获取父级状态 */


/* Provider共享状态实现 */
class InheritedProvider<T> extends InheritedWidget {
  InheritedProvider({@required this.data, Widget child}) : super(child: child);

  //共享状态使用泛型
  final T data;

  @override
  bool updateShouldNotify(InheritedProvider<T> old) {
    //在此简单返回true，则每次更新都会调用依赖其的子孙节点的`didChangeDependencies`。
    return true;
  }
}

class ChangeNotifier implements Listenable {
  List listeners = [];

  @override
  void addListener(VoidCallback listener) {
    listeners.add(listener);
  }

  @override
  void removeListener(VoidCallback listener) {
    listeners.remove(listener);
  }

  void notifyListeners() {
    listeners.forEach((item) => item());
  }
}


class ChangeNotifierProvider<T extends ChangeNotifier> extends StatefulWidget {
  ChangeNotifierProvider({
    Key key,
    this.data,
    this.child,
  });

  final Widget child;
  final T data;

  //定义一个便捷方法，方便子树中的widget获取共享数据
  static T of<T>(BuildContext context) {
    final provider =  context.dependOnInheritedWidgetOfExactType<InheritedProvider<T>>();
    return provider.data;
  }

  @override
  _ChangeNotifierProviderState<T> createState() => _ChangeNotifierProviderState<T>();
}

class _ChangeNotifierProviderState<T extends ChangeNotifier> extends State<ChangeNotifierProvider<T>> {

  void update() {
    setState(() {
      
    });
  }

  @override
  void didUpdateWidget(ChangeNotifierProvider<T> oldWidget) {

    if (oldWidget.data != widget.data) {
      oldWidget.data.removeListener(update);
      widget.data.addListener(update);
    }

    super.didUpdateWidget(oldWidget);

  }

  @override
  void initState() {
    super.initState();

    // 给model添加监听器
    widget.data.addListener(update);
  }

  @override
  void dispose() {
    super.dispose();

    widget.data.removeListener(update);
  }


  @override
  Widget build(BuildContext context) {
    return InheritedProvider<T>(
      data: widget.data,
      child: widget.child,
    );
  }
}


class ProviderTest extends StatefulWidget {
  @override
  _ProviderTestState createState() => _ProviderTestState();
}

class _ProviderTestState extends State<ProviderTest> {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<CommonData>(
      data: CommonData(name: '费涛'),
      child: ChildWidget(),
    );
  }
}

class ChildWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
        width: 200,
        height: 200,
        color: Colors.yellow,
        child: Text('${ChangeNotifierProvider.of<CommonData>(context).name}'),
    );
  }
}
/* Provider共享状态实现 */



