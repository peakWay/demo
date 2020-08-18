
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ChatMessageAvatar extends StatelessWidget {
  ChatMessageAvatar({
    this.sex,
    @required this.src,
    this.showBorder = true
  }) : assert(src != null);

  final int sex;
  final String src;
  final bool showBorder;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 78.w,
      height: 78.w,
      decoration: BoxDecoration(
        border: showBorder ? Border.all(width: 2.w, color: sex == 1 ? Color(0xFF95DCFE) : sex == 2 ? Color(0xFFF6B0C3) : Color(0xFFeeeeee)) : null,
        image: DecorationImage(
          image: NetworkImage(src),
          fit: BoxFit.fitWidth
        ),
        shape: BoxShape.circle
      ),
    );
  }
}