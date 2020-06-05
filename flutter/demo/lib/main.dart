import 'package:flutter/material.dart';
import './base-lib/view/decoration.dart';
import 'dart:math';



class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    print('');

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
      padding: EdgeInsets.all(20),
      child: Container(
        width: 300,
        height: 300,
        decoration: ShapeDecoration(
          shape: BeveledRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(20)), side: BorderSide(color: Colors.white, style: BorderStyle.solid, width: 2)),
          image: DecorationImage(
            image:NetworkImage('https://oss.pocketuniversity.cn/media/2019-09-19/5d82dea62ca69.JPG'),  
            fit: BoxFit.cover
          ),
          shadows: [
            BoxShadow(spreadRadius: 10, color: Colors.red)
          ],
        ),
        transform: Matrix4.identity()..translate(10.0, 10.0, 0)..rotateZ(pi / 6)..scale(2.0, 2.0, 1)
        // BoxDecoration(
        //   image: DecorationImage(
        //     image:NetworkImage('https://oss.pocketuniversity.cn/media/2019-09-19/5d82dea62ca69.JPG'),
        //     // alignment: Alignment(0.2, 1.0),
  
        //     fit: BoxFit.cover
        //   ),
        //   boxShadow: [
        //     BoxShadow(spreadRadius: 10, color: Colors.red)
        //   ],
        //   // gradient: LinearGradient(
        //   //   begin: Alignment(-1.0, -1.0), 
        //   //   end: Alignment(-0.96, -0.96), 
        //   //   colors: [Colors.white, Colors.white, Colors.black, Colors.black],
        //   //   stops: [0, 0.5, 0.5 , 1],
        //   //   tileMode: TileMode.repeated
        //   // ),
        //   shape: BeveledRectangleBorder
        //   //  BoxShape.rectangle
            
        // ),
        // child: Padding(padding: EdgeInsets.all(1), child: Container(color: Color.fromRGBO(255,126,152, 0.8))),
      )
    );
  }
}


void main() => runApp(MyApp());
