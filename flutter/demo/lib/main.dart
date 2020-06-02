import 'package:flutter/material.dart';
import './base-lib/view/decoration.dart';

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(title: Text('demo')),
        body: Column(
          children: <Widget>[
            MyRow(),
            // MyDecoration()
          ],
        )
      ),
    );
  }
}

class MyRow extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 200,
      height: 200,
      margin: EdgeInsets.fromLTRB(10, 10, 10, 10),
      decoration: BoxDecoration(
        border: Border(bottom: BorderSide(width: 1, style: BorderStyle.solid, color: Colors.black)),
        color: Colors.yellow,
      ),
      
      child: Stack(
        // overflow: Overflow.visible,
        children: <Widget>[
          Container(
            width: 300,
            height: 100,
            color: Colors.pink,
            child: Text(
              '是对肌肤    十分惊悚金佛山大家圣诞节佛山的肌肤就哦是大家放松的',
              style: TextStyle(
                fontSize: 14,
                letterSpacing: 1
              ),
              // softWrap: ,
              strutStyle: StrutStyle(
                forceStrutHeight: true,
                height: 1.3,
                // fontSize: 12,
                // leading: 2
              ),
            ),
          ),
          // Positioned(
          //   child:  Text(
          //     '是对肌肤    十分惊悚金佛山大家圣诞节佛\n山的肌肤就哦是大家放松的',
          //     // softWrap: ,
          //     strutStyle: StrutStyle(
          //       height: 1
          //     ),
          //   ),
          //   bottom: 0,
          //   right: 0,
          //   top: 0
          // )
        ],
      ),
    );
  }
}


void main() => runApp(MyApp());
