import 'package:flutter/material.dart';
import 'dart:math';
import 'package:demo/fpdx/uikit/action_sheet/action_sheet.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:demo/fpdx/uikit/tabbar/tabbar.dart';
import 'package:demo/fpdx/components/task.dart';
import 'package:demo/base-lib/view/context.dart';



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
        body: Center(
          child: BaseWidget(),
        )
      ),
    );
  }
}

class BaseWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    ScreenUtil.init(context, width: 750, height: 1334);


    return FatherWidget();
  }
}

void main() => runApp(MyApp());
