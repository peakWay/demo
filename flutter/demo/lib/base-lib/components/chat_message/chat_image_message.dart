


import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:demo/base-lib/components/chat_message/chat_message_avatar.dart';
import './chat_message.dart';

class ChatImageMessage extends StatelessWidget {
  ChatImageMessage({
    Key key,
    @required this.src,
    this.isSelf = false,
    this.isSuper = false,
    this.state,
    this.avatarLongPress,
    this.onDelete,
    this.onRevoke,
    this.headerSlot,
    this.padding
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
        return ImageMessage(
          src: src
        );
      },
    );
  }
}

class ImageMessage extends StatefulWidget {
  ImageMessage({
    Key key,
    @required this.src,
  }) : super(key: key);

  final String src;
  

  @override
  _ImageMessageState createState() => _ImageMessageState();
}

class _ImageMessageState extends State<ImageMessage> {
  static double maxScale = 320.w;  //最大尺寸
  static double minScale = 110.w;

  double visibleWidth;
  double visibleHeight;

  @override
  void initState() {
    super.initState();

    
    _calculateImageWidthAndHeight();
  }

  //计算宽高
  void _calculateImageWidthAndHeight() {
    double width = 450;
    double height = 5486;

    if (width > height ) {

      if ((width / height) > (maxScale / minScale)) {
        visibleWidth = maxScale;
        visibleHeight = minScale;
      } else {
        visibleHeight = (maxScale / width) * height;
        visibleWidth =  maxScale;
      }
        
    } else if (width < height) {

      if ((height / width) > (maxScale / minScale)) {
          visibleHeight = maxScale;
          visibleWidth = minScale;
      } else {
          visibleWidth = maxScale / height * width;
          visibleHeight = maxScale;
      }
        
    } else {
      visibleWidth = maxScale;
      visibleHeight = maxScale;
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        //TODO:查看照片
      },
      child: ClipRRect(
        borderRadius: BorderRadius.circular(35.w),
        child: Image(
          image: NetworkImage('${widget.src}'),
          width: visibleWidth,
          height: visibleHeight,
          fit: BoxFit.cover
          // visibleWidth > visibleHeight ? BoxFit.fitHeight : BoxFit.fitWidth
        ),
      ),
    );
  }
}
