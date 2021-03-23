
import 'dart:async';

import 'package:demo/base-lib/utils/duration.dart';
import 'package:flutter/material.dart';

abstract class CountdownWidget extends StatefulWidget {

  CountdownWidget({
    Key key,
    @required this.target
  }) : assert(target != null);

  final int target;

  //倒计时进行中时间结束
  @protected
  void timeout() {}

  //初始化超时
  @protected
  void initOvertime() {}

  //倒计时变化
  void change() {}

  @protected
  Widget build(BuildContext context, DayTime remain);

  @override
  _CountdownWidgetState createState() => _CountdownWidgetState();
}

class _CountdownWidgetState extends State<CountdownWidget> {

  Timer _timer;
  int target;
  DayTime remain;

  @override
  void initState() {
    super.initState();

    start();
  }

  @override
  void didUpdateWidget(CountdownWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.target != oldWidget.target) {
      _timer.cancel();
      start();
    }
  }


  start() {
    target = widget.target;

    //判断是否超时
    if (_isOver()) {
      widget.initOvertime();
      remain = DayTime.zero();
      setState(() {});
    }

    Duration diff = DateTime.fromMillisecondsSinceEpoch(target).difference(DateTime.now());

    _timer = Timer.periodic(new Duration(seconds: 1), (timer) { 
      if (_isOver()) {
        timer.cancel();
        remain = DayTime.zero();
        widget.timeout();
      } else {
        diff = diff - new Duration(seconds: 1);
        remain = DayTime.fromDuration(diff);
        widget.change();
      }

      //自动更新
      setState(() {});
    });
  }

  bool _isOver() {
    return new DateTime.now().millisecondsSinceEpoch > target;
  }

  @override
  void dispose() {
    super.dispose();
    _timer.cancel();
  }

  @override
  Widget build(BuildContext context) {
    return remain == null ? SizedBox() : widget.build(context, remain);
  }
}