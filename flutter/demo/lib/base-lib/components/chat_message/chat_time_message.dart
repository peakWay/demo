
import 'package:demo/fpdx/constants/style.dart';
import 'package:demo/fpdx/utils/date_util.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ChatTimeMessage extends StatelessWidget {
  ChatTimeMessage({
    this.timestamp
  });

  final int timestamp;

  get timeFormat => DateUtil.calculateMessageTime(timestamp);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 20.w),
      child: Center(
        child: Text('$timeFormat', style: TextStyle(color: MyColors.textMinor, fontSize: 26.sp, height: 1.3)),
      ),
    );
  }
}