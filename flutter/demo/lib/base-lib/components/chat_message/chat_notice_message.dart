import 'package:demo/fpdx/constants/style.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ChatNoticeMessage extends StatelessWidget {
  ChatNoticeMessage({
    Key key,
    this.child
  }) : super(key: key);

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 20.w),
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: Color(0xFFF3F4F5),
          borderRadius: BorderRadius.circular(60.w)
        ),
        child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 40.w, vertical: 16.w),
            child: Center(
              widthFactor: 1, 
              heightFactor: 1,
              child: DefaultTextStyle(
                style: TextStyle(
                  fontSize: 26.sp,
                  color: MyColors.textMinor,
                  height: 1.3
                ), 
                child: child
            ),
          )
        )
      )
    );
  }
}