import 'dart:math';

import 'package:flutter/material.dart';

MyName nameNotifier = MyName('未定义');
// class MyName extends ChangeNotifier {
//   String name;

//   setName(String name) {
//     this.name = name;
  
//     print('${this.name}, $hasListeners');

//     notifyListeners();
//   }
// }
class MyName extends ValueNotifier<String> {
  MyName(name): super(name);
}

class First extends StatefulWidget {
  @override
  _FirstState createState() => _FirstState();
}

class _FirstState extends State<First> {

  @override
  void initState() {
    super.initState();

    nameNotifier.addListener(console);
  }

  @override
  void didUpdateWidget(covariant First oldWidget) {
    print('First更新');
    
    super.didUpdateWidget(oldWidget);
  }

  @override
  void dispose() {
    super.dispose();
    nameNotifier.removeListener(console);
  }

  void console() {
    print('我被记录了');

    setState(() {});
  } 
  
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.pink,
      child: Text('当前名字：${nameNotifier.value}'),
    );
  }
}


//共享数据，子孙可以通过特定方式访问，但是通知不写在这，而写在订阅器里
class InheritedProvider<T> extends InheritedWidget {
  InheritedProvider({
    @required this.data,
    Widget child
  }): super(child: child);
  
  final T data;

  @override
  bool updateShouldNotify(covariant InheritedWidget oldWidget) {
    return true;
  }
}

class ChangeNotifierProvider<T extends ChangeNotifier> extends StatefulWidget {
  ChangeNotifierProvider({
    this.data,
    this.child
  });

  final Widget child;
  final T data;

  static T of<T> (BuildContext context, {bool listen = true}) {
    final provider = listen
        ? context.dependOnInheritedWidgetOfExactType<InheritedProvider<T>>()
        : context.getElementForInheritedWidgetOfExactType<InheritedProvider<T>>()?.widget
            as InheritedProvider<T>;

    return provider.data;
  }

  @override
  _ChangeNotifierProviderState<T> createState() => _ChangeNotifierProviderState<T>();
}

class _ChangeNotifierProviderState<T extends ChangeNotifier> extends State<ChangeNotifierProvider<T>> {

  void update() {
    setState(() {});
    print('更新吧');
  }

  @override
  void initState() {
    widget.data.addListener(update);
    super.initState();
  }

  @override
  void dispose() {
    widget.data.removeListener(update);
    super.dispose();
  }

  @override
  void didUpdateWidget(covariant ChangeNotifierProvider<T> oldWidget) {
    print('${oldWidget.data}, ${widget.data}');
    super.didUpdateWidget(oldWidget);

    if (widget.data != oldWidget.data) {
      oldWidget.data.removeListener(update);
      widget.data.addListener(update);
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return InheritedProvider<T>(
        data: widget.data,
        child: widget.child
    );
  }
}
class Second extends StatefulWidget {
  @override
  _SecondState createState() => _SecondState();
}

class _SecondState extends State<Second> {

  MyName nameProvider;

  @override
  void didChangeDependencies() {
    nameProvider = ChangeNotifierProvider.of<MyName>(context);

    super.didChangeDependencies();
  }
  @override
  Widget build(BuildContext context) {
    print('Second渲染了');
    return Container(
      color: Colors.yellow,
      child: Text(nameProvider.value)
    );
  }
}

class ChangeProviderValue extends StatefulWidget {
  @override
  _ChangeProviderValueState createState() => _ChangeProviderValueState();
}

class _ChangeProviderValueState extends State<ChangeProviderValue> {

  MyName nameProvider;

  @override
  void didChangeDependencies() {
    nameProvider = ChangeNotifierProvider.of<MyName>(context, listen: false);
    super.didChangeDependencies();
  }

  @override
  Widget build(BuildContext context) {
    print('ChangeProviderValue渲染了');
    return Column(
      children: [
        Padding(
          padding: EdgeInsets.only(top: 40),
          child: Second()
        ),

        RaisedButton(
          child: Text('provider改名'),
          onPressed: () {
            nameProvider.value = '怪老头' + Random().nextInt(10).toString();
          },
        )
      ],
    );
  }
}

class Customer<T> extends StatelessWidget {
  Customer({
    Key key,
    @required this.builder,
  })  : assert(builder != null),
      super(key: key);

  final Widget Function(BuildContext context, T value) builder;

  @override
  Widget build(BuildContext context) {
    return builder(context, ChangeNotifierProvider.of<T>(context));
  }
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  
  
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: Scaffold(
        appBar: AppBar(title: Text('demo')),
        body: ChangeNotifierProvider(
          data: MyName('默认值'),
          child: Column(
            children: [
              First(),

              RaisedButton(
                child: Text('notifier改名'),
                onPressed: () {
                  nameNotifier.value = '费涛';
                },
              ),

              ChangeProviderValue(),

              Padding(
                padding: EdgeInsets.only(top: 40),
                child: Builder(
                  builder: (BuildContext context) {
                    return Text(ChangeNotifierProvider.of<MyName>(context).value);
                  }
                ),
              ),

              Customer<MyName>(
                builder: (BuildContext context, MyName provider) {
                  return Text(provider.value);
                },
              )
            ],
          ),
        )
      )
    );
  }
}

void main() => runApp(MyApp());