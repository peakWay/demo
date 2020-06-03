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
    return Padding(
      padding: EdgeInsets.all(10),
      child: Container(
        width: 300,
        height: 300,
        decoration: BoxDecoration(
          // image: DecorationImage(
          //   // image:NetworkImage('https://oss.pocketuniversity.cn/media/2019-09-19/5d82dea62ca69.JPG'),
          //   // alignment: Alignment(0.2, 1.0),
  
          //   fit: BoxFit.cover
          // ),
          gradient: LinearGradient(
            begin: Alignment(-1.0, -1.0), 
            end: Alignment(-0.96, -0.96), 
            colors: [Colors.white, Colors.white, Colors.black, Colors.black],
            stops: [0, 0.5, 0.5 , 1],
            tileMode: TileMode.repeated
          ),
            
        ),
        child: Padding(padding: EdgeInsets.all(1), child: Container(color: Colors.white),),
      )
    );
  }
}


void main() => runApp(MyApp());
