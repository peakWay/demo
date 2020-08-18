

import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:demo/base-lib/components/chat_message/chat_message_avatar.dart';
import 'package:demo/base-lib/components/chat_message/chat_message_triangle.dart';
import 'package:demo/fpdx/utils/voice.dart';
import './chat_message.dart';

class ChatVoiceMessage extends StatelessWidget {
  ChatVoiceMessage({
    Key key,
    @required this.src,
    this.isSelf = false,
    this.isSuper = false,
    this.state,
    this.avatarLongPress,
    this.onDelete,
    this.onRevoke,
    this.headerSlot,
    this.padding,
  }) : assert(src != null),
       super(key: key);

  final String src;
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
          child: VoiceMessage(
            src: src,
            color: color,
            direction: isSelf ? 'right' : 'left',
            textColor: isSelf ? Colors.white : Color(0xFF333333),
          ),
          color: color,
          direction: isSelf ? 'right' : 'left',
        );
      },
    );
  }
}

class VoiceMessage extends StatefulWidget {
  VoiceMessage({
    Key key,
    @required this.src,
    this.color,
    this.textColor,
    this.direction
  }) : super(key: key);

  final String src;
  final Color color;
  final Color textColor;
  final String direction;

  @override
  _VoiceMessageState createState() => _VoiceMessageState();
}

class _VoiceMessageState extends State<VoiceMessage> {

  int duration;
  double width;

  @override
  void initState() {
    super.initState();

    //计算语音宽度
    duration = VoiceUtils.getSecondDurationFromSrc(widget.src);

    //根据时长计算宽度
    if (duration >= 60) {
      width = 460.w;
    } else if (duration <= 2) {
      width = 180.w;
    } else {
      width = (180 + (duration - 2) / (60 - 2) * (460 - 180)).w;
    }

    print('$width');

  }

  @override
  Widget build(BuildContext context) {
    print('$width, width');

    return GestureDetector(
      onTap: () {
        //TODO: 切换语音状态
      },
      child: Container(
        width: width,
        height: 78.w,
        padding: EdgeInsets.symmetric(horizontal: 30.w, vertical: 20.w),
        decoration: BoxDecoration(
          color: widget.color,
          borderRadius: BorderRadius.circular(50.w)
        ),
        child: Row(
          textDirection: widget.direction == 'right' ? TextDirection.rtl: TextDirection.ltr,
          children: <Widget>[
            Icon(Icons.voice_chat, color: widget.textColor, size: 28.sp),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 18.w),
              child: Text('${duration}s', style: TextStyle(color: widget.textColor))
            )
          ],
        )
      ),
    );
  }
}
