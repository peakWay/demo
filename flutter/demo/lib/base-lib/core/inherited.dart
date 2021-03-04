import 'package:flutter/material.dart';

class ShareDataWidget extends InheritedWidget {
  ShareDataWidget({
    @required this.data,
    Widget child
  }): super(child: child);

  final int data;

  static ShareDataWidget of(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<ShareDataWidget>();
  }

  @override
  bool updateShouldNotify(ShareDataWidget oldWidget) {
    return oldWidget.data != data;
  }
}

class TestWidget extends StatefulWidget {
  @override
  _TestWidgetState createState() => _TestWidgetState();
}

class _TestWidgetState extends State<TestWidget> {

  int data;
  
  @override
  void didChangeDependencies() {
    data = ShareDataWidget.of(context).data;

    super.didChangeDependencies();
  }

  @override
  Widget build(BuildContext context) {
    return Text(data.toString());
  }
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  int count = 1;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    
  }

  @override
  Widget build(BuildContext context) {
      
    return MaterialApp(
      title: 'Flutter Demo',
      home: Scaffold(
        appBar: AppBar(title: Text('demo')),
        body: Center(
          child: ShareDataWidget(
            data: count,
            child: Column(
              children: [
                Padding(
                  padding: EdgeInsets.only(bottom: 10),
                  child: TestWidget(),
                ),
                FlatButton(
                  onPressed: () {
                    setState(() => ++count);
                  },
                  child: Text('增加')
                )
              ],
            ),
          ),
        )
      )
    );
  }
}

void main() => runApp(MyApp());
