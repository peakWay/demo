

import 'package:demo/base-lib/components/custom-button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import './chat_message.dart';

class ChatMessageTooltip extends StatelessWidget {

  ChatMessageTooltip({
    this.tooltips,
    this.offset,
    this.size
  });

  ///操作列表
  final Set<TooltipModel> tooltips;

  ///父级离边界位置
  final Offset offset;

  ///父级大小
  final Size size;

  ///操作栏高度
  static double _height = 72.w;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Positioned(
          left: offset.dx + size.width / 2 - tooltips.length * 96.w / 2,
          top: offset.dy - size.height - _height,
          child: ClipRRect(
            borderRadius: BorderRadius.circular(15.w),
            child: DecoratedBox(
              decoration: BoxDecoration(
                color: Color(0xFF03081A)
              ),
              child: Row(
                children: tooltips.map(
                  (e) => PaddingButton(
                    padding: EdgeInsets.symmetric(horizontal: 20.w, vertical: 20.w),
                    child: Text(e.label, style: TextStyle(height: 1.3)),
                    decoration: BoxDecoration(
                      color: Colors.transparent,
                      border: e != tooltips.last ? Border(right: BorderSide(width: 2.w, color: Colors.white.withOpacity(0.8))) : null,
                    ),
                    onTap: () {
                      Navigator.of(context).pop();
                      e.onTap();
                    },
                  )
                ).toList(),
              ),
            ),
          ),
        ),
        Positioned(
          left: offset.dx + size.width / 2,
          top: offset.dy - size.height + 20.w,
          child: DecoratedBox(
            decoration: BoxDecoration(
              border: Border(top: BorderSide(color: Colors.transparent, width: 18.w), bottom: BorderSide(color: Color(0xFF03081A), width: 18.w), left: BorderSide(color: Colors.transparent, width: 18.w), right: BorderSide(color: Colors.transparent, width: 18.w))
            ),
          )
        )
      ],
    );
  }
}

class HornRectClipper extends CustomClipper<Rect> {
  Rect getClip(Size size) {
    return Rect.fromLTWH(0, 0, size.width, size.height);
  }

  bool shouldReclip(CustomClipper<Rect> oldClipper) {
    return true;
  }
}
