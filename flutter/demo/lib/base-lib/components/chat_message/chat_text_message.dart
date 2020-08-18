
import 'package:demo/base-lib/components/chat_message/chat_message_avatar.dart';
import 'package:demo/base-lib/components/chat_message/chat_message_triangle.dart';
import 'package:demo/fpdx/view/emoji.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter/services.dart';
import 'package:extended_text/extended_text.dart';
import './chat_message.dart';

class ChatTextMessage extends StatelessWidget {
  ChatTextMessage({
    this.text,
    this.isSelf = false,
    this.isSuper = false,
    this.state,
    this.avatarLongPress,
    this.onDelete,
    this.onRevoke,
    this.headerSlot,
    this.padding
  });


  final String text;
  final bool isSelf;
  final bool isSuper;
  final ChatMessageState state;
  final GestureLongPressCallback avatarLongPress;
  final Function onDelete;
  final Function onRevoke;
  final Widget headerSlot;
  final EdgeInsets padding;

  get color => isSelf ? Color(0xFFFFA8CB) : Colors.white;

  @override
  Widget build(BuildContext context) {
    return ChatMessage(
      isSelf: isSelf,
      isSuper: isSuper,
      state: state,
      headerSlot: headerSlot,
      padding: padding,
      avatarSlot: ChatMessageAvatar(
        src: 'https://oss.pocketuniversity.cn/media/2019-09-19/5d82dea62ca69.JPG',
        sex: 1
      ),
      avatarLongPress: avatarLongPress,
      tooltips: {
        TooltipModel(
          label: '复制', 
          onTap: (){
            print('复制');
            Clipboard.setData(ClipboardData(text: text));
          }
        ),
        TooltipModel(
          label: '删除', 
          onTap: onDelete
        ),
        TooltipModel(
          label: '撤回', 
          onTap: onDelete
        )
      },
      builder: (BuildContext context) {
        return ChatMessageTriangle(
          child: TextMessage(
            text: text,
            color: color,
            textColor: isSelf ? Colors.white : Color(0xFF333333),
          ),
          color: color,
          direction: isSelf ? 'right' : 'left',
        );
      },
    );
  }
}

class TextMessage extends StatelessWidget {
  TextMessage({
    this.text,
    this.color,
    this.textColor
  });

  final String text;

  final Color color;

  final Color textColor;

  @override
  Widget build(BuildContext context) {
    return Container(
      constraints: BoxConstraints(maxWidth: 490.w),
      padding: EdgeInsets.symmetric(horizontal: 30.w, vertical: 20.w),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(50.w)
      ),
      child: 
      ExtendedText(
        text != null && text.length > 0
            ? text
            : '',
        style: TextStyle(color: textColor, fontSize: 28.sp, height: 1.3),
        specialTextSpanBuilder: MySpecialTextSpanBuilder(),
      ),
    );
  }
}



