

import 'package:demo/base-lib/components/chat/chat_message_tooltip.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

enum ChatMessageState {
  ///成功
  success,
  ///发送失败
  fail,
  ///发送中
  sending,
  ///发送错误
  error,
  ///被撤回
  revoke
}

class TooltipModel {
  TooltipModel({
    this.label,
    this.onTap
  });

  final String label;
  final GestureTapCallback onTap;
}

class ChatMessage extends StatefulWidget {
  ChatMessage({
    Key key,
    this.isSelf,
    this.headerSlot,
    this.showTooltip,
    this.state,
    this.padding,
    this.avatarSlot,
    this.avatarOnTap,
    this.avatarLongPress,
    this.messageLongPress,
    this.tooltips,
    this.createdAt,
    this.isSuper,
    @required this.builder
  }) : assert(builder != null),
       super(key: key);

  ///是否是自己的消息
  final bool isSelf;

  ///主体内容以上的占位
  final Widget headerSlot;

  ///是否允许长按显示操作栏
  final bool showTooltip;

  ///聊天消息状态
  final ChatMessageState state;

  ///消息边距
  final EdgeInsets padding;

  ///头像占位
  final Widget avatarSlot;

  ///头像点击回调
  final GestureTapCallback avatarOnTap;

  ///头像长按回调
  final GestureLongPressCallback avatarLongPress;

  ///消息长按回调
  final GestureLongPressCallback messageLongPress;

  ///操作栏列表
  final Set<TooltipModel> tooltips;

  ///消息主体
  final Function builder;

  ///该条消息时间
  final DateTime createdAt;

  ///是否是管理员
  final bool isSuper;


  @override
  _ChatMessageState createState() => _ChatMessageState();
}

class _ChatMessageState extends State<ChatMessage> {

  get textDirection => widget.isSelf ? TextDirection.rtl : TextDirection.ltr;
  
  /* 功能 */
  void _showTooltip(context) async{ 

    if (widget.tooltips == null) return;

    //不能删除他人的消息
    if (!widget.isSelf && !widget.isSuper) {
      widget.tooltips.removeWhere((element) => element.label == '删除');
    }

    ///是否能撤回
    if (!widget.isSelf || (widget.createdAt != null && DateTime.now().difference(widget.createdAt).inMinutes > 2)) {
      widget.tooltips.removeWhere((element) => element.label == '撤回');
    }

    if (widget.tooltips == null) return;

    Offset offset = context.findRenderObject().localToGlobal(Offset(0.0, context.size.height));
    Size size = context.size;

    showGeneralDialog(
      context: context,
      transitionDuration: Duration(milliseconds: 300),
      pageBuilder: (BuildContext buildContext, Animation<double> animation,
          Animation<double> secondaryAnimation) {
        return WillPopScope(
          onWillPop: () async {
            return true;
          },
          child: ChatMessageTooltip(
            tooltips: widget.tooltips,
            offset: offset,
            size: size
          )
        );
      },
      barrierDismissible: true,
      barrierLabel:
          MaterialLocalizations.of(context).modalBarrierDismissLabel,
      barrierColor: Color.fromRGBO(255, 255, 255, 0)
      );
  }
  /* 功能 */

  /* UI */
  //常见UI
  Widget _buildGeneralMessage() {
    return Builder(
      builder: (BuildContext context) {
        return GestureDetector(
          onLongPress: () {
            widget.messageLongPress ?? _showTooltip(context);
          },
          child: widget.builder(context),
        );
      },
    );
  }

  //各状态额外样式
  Widget _buildMessage() {
    switch (widget.state) {
      case ChatMessageState.success:
          return _buildGeneralMessage();
        break;
      case ChatMessageState.fail:
          return _buildFailMessage();
        break;
      case ChatMessageState.sending:
          return _buildGeneralMessage();
        break;
      case ChatMessageState.revoke:
          return _buildGeneralMessage();
        break;
      case ChatMessageState.error:
          return _buildFailMessage();
        break;
      default:
          return _buildGeneralMessage();
    }
  }

  Widget _buildFailMessage() {
    return Row(
      textDirection: textDirection,
      children: <Widget>[
        _buildGeneralMessage(),
        Container(
          width: 40.w,
          height: 40.w,
          margin: widget.isSelf ? EdgeInsets.only(right: 10.w) : EdgeInsets.only(left: 10.w),
          decoration: BoxDecoration(
            color: Color(0xFFFF5555),
            borderRadius: BorderRadius.circular(20.w)
          ),
          child: Icon(Icons.error, size: 28.sp, color: Colors.white),
        ),
      ],
    );
  }
  /* UI */
  
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: widget.padding ?? EdgeInsets.symmetric(horizontal: 24.w, vertical: 20.w),
      child: Row(
        textDirection: textDirection,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          GestureDetector(
            onTap: widget.avatarOnTap,
            onLongPress: widget.avatarLongPress,
            child: widget.avatarSlot,
          ),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 20.w),
            child: Column(
              children: <Widget>[
                widget.headerSlot ?? SizedBox(),
                _buildMessage()
              ],
            ),
          )
        ],
      ),
    );
  }
}

