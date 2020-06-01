
/**
 * 常用相关css与decoration的demo,view
 * 有以下类:
 * Wrap
 */

import 'package:flutter/material.dart';


class MyDecoration extends StatelessWidget {
  
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        width: 200.0,
        height: 200.0,
        color: Colors.yellow,
        child: _Wrap()
      ),
    );
  }
}

class _Wrap extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Wrap(
      alignment: WrapAlignment.spaceEvenly,
      crossAxisAlignment: WrapCrossAlignment.center,
      runAlignment: WrapAlignment.center,
      // direction: Axis.vertical,
      // spacing: 20,  //主轴方向上的间距
      runSpacing: 10,  //纵轴方向元素的间距
      textDirection: TextDirection.rtl,
      children: <Widget>[
        Container(
          width: 80.0,
          height: 40.0,
          color: Colors.pink
        ),
        Container(
          width: 80.0,
          height: 40.0,
          color: Colors.lightBlue
        ),
        Container(
          width: 80.0,
          height: 40.0,
          color: Colors.lightGreen
        ),
        Container(
          width: 80.0,
          height: 60.0,
          color: Colors.brown
        )
      ],
    );
  }
}