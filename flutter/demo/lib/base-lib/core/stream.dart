import 'dart:async';
import 'package:flutter/material.dart';


/**
 * 感觉流的功能很有用，但暂时没想到，平时需要注意
 * 凡是UI会依赖多个异步数据而发生变化的场景都可以使用StreamBuilder
 */
Stream<int> countdown() {

  StreamController<int> _streamController = StreamController<int>();

  int count = 10;

  Timer.periodic(Duration(seconds: 1), (timer) {
    _streamController.add(--count);

    if (count == 0) {
      timer.cancel();
      _streamController.close();
    }
  });

  return _streamController.stream;
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
        body: Center(
          child: StreamBuilder(
            stream: countdown(),
            builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
              print('$snapshot');

              return Text(snapshot.data.toString());
            },
          )
        ),
      )
    );
  }
}

void main() => runApp(MyApp());