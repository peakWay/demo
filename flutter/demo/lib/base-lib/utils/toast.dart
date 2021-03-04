
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:oktoast/oktoast.dart';
import 'package:flutter/material.dart';

class Toast {
  static show(String msg, {int duration = 2000, Function onDismiss}) {
    showToast(msg,
        backgroundColor: Color(0xff333333).withOpacity(0.65),
        textStyle: TextStyle(
          color: Colors.white,
          fontSize: 30.sp,
        ),
        duration: Duration(milliseconds: duration),
        dismissOtherToast: true,
        onDismiss: onDismiss
    );
  }

  static showWidget(Widget child, {int duration = 2000, Function onDismiss}) {
    showToastWidget(child,
      duration: Duration(milliseconds: duration),
      dismissOtherToast: true,
      onDismiss: onDismiss
    );
  }

  static imShow(String msg, {duration = 2000}) {
    showToast(msg,
        backgroundColor: Color(0xff333333).withOpacity(0.65),
        textStyle: TextStyle(
          color: Colors.white,
          fontSize: 30.sp,
        ),
        duration: Duration(milliseconds: duration),
        dismissOtherToast: true);
  }

  static cancelToast() {
    dismissAllToast();
  }
}
