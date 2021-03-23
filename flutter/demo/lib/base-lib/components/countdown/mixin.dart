
import 'dart:async';

import 'package:flutter/material.dart';

mixin CountdownState<T extends StatefulWidget> on State<T> {
  int target;
  Timer _timer;

  //正在进行中
  @protected
  void onCountdownTimeout() {}

  //传入的初始时间超时
  @protected
  void onCountdownInitOvertime() {}

  @protected
  void onCountdownChange(Duration duration) {}

  @override
  void initState() {
    super.initState();

    if (_checkIsOver()) 
      return onCountdownInitOvertime(); 

    Duration diff = new DateTime.fromMillisecondsSinceEpoch(target).difference(new DateTime.now());
    
    _timer = Timer.periodic(Duration(seconds: 1), (timer) { 
      if (_checkIsOver()) {
        timer.cancel();
        onCountdownTimeout();
      } else {
        diff = diff - Duration(seconds: 1);
        onCountdownChange(diff);
      } 
    });
  }

  bool _checkIsOver() {
    return new DateTime.now().millisecondsSinceEpoch > target;
  }

  @override
  void dispose() {
    super.dispose();

    _timer.cancel();
  }
}