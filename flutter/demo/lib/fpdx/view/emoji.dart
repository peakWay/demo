
import 'package:extended_text_field/extended_text_field.dart';

/// emoji
///
/// created by simiaodong
/// created at 2019-11-07
//

import 'package:flutter/material.dart';
import 'package:demo/fpdx/constants/style.dart';
import 'package:demo/fpdx/utils/adaptation.dart';

List<Map<String, dynamic>> emojiList = [
  {"name": "啊", "alias": "a"},
  {
    "name": "懵",
    "otherNames": ["白眼"],
    "alias": "baiyan"
  },
  {"name": "大笑", "alias": "daxiao"},
  {"name": "笑哭", "alias": "xiaoku"},
  {"name": "鼻涕", "alias": "biti"},
  {"name": "花痴", "alias": "huachi"},
  {"name": "爱心", "alias": "aixin"},
  {"name": "坏笑", "alias": "huaixiao"},
  {"name": "开心", "alias": "kaixin"},
  {"name": "调皮", "alias": "tiaopi"},
  {
    "name": "嗨起来",
    "otherNames": ["爱你"],
    "alias": "aini"
  },
  {"name": "龇牙", "alias": "ziya"},
  {"name": "汗颜", "alias": "hanyan"},
  {"name": "尴尬", "alias": "ganga"},
  {"name": "发呆", "alias": "fadai"},
  {"name": "飞吻", "alias": "feiwen"},
  {"name": "笑脸", "alias": "xiaolian"},
  {"name": "大闹", "alias": "danao"},
  {"name": "点赞", "alias": "dianzan"},
  {"name": "幽灵", "alias": "youling"},
  {"name": "流泪", "alias": "liulei"},
  {"name": "呼气", "alias": "huqi"},
  {"name": "疑问", "alias": "yiwen"},
  {"name": "面无表情", "alias": "mianwubiaoqing"},
  {"name": "恶魔", "alias": "emo"},
  {"name": "闭嘴", "alias": "bizui"},
  {"name": "猪头", "alias": "zhutou"},
  {"name": "酷", "alias": "ku"},
  {"name": "怪物", "alias": "guaiwu"},
  {"name": "懵逼", "alias": "mengbi"},
  {"name": "流鼻血", "alias": "liubixue"},
  {"name": "饿死", "alias": "esi"},
  {"name": "斜眼", "alias": "xieyan"},
  {"name": "流汗", "alias": "liuhan"},
  {"name": "犯困", "alias": "fankun"},
  {"name": "三条线", "alias": "santiaoxian"},
  {"name": "贪吃", "alias": "tanchi"},
  {"name": "笑掉大牙", "alias": "xiaodiaodaya"},
  {"name": "感冒", "alias": "ganmao"},
  {"name": "便便", "alias": "bianbian"},
  {"name": "不舒服", "alias": "bushufu"},
  {"name": "大惊", "alias": "dajing"},
  {"name": "惊讶", "alias": "jingya"},
  {"name": "冷酷", "alias": "lengku"},
  {"name": "打瞌睡", "alias": "dakeshui"},
  {"name": "星星眼", "alias": "xingxingyan"},
  {
    "name": "飞吻",
    "otherNames": ["献吻"],
    "alias": "xianwen"
  },
  {"name": "无聊", "alias": "wuliao"},
  {
    "name": "emm",
    "otherNames": ["嗯"],
    "alias": "en"
  },
  {"name": "难过", "alias": "nanguo"},
  {"name": "天使", "alias": "tianshi"},
  {"name": "愤怒", "alias": "fennu"},
  {"name": "忍者", "alias": "renzhe"},
  {"name": "晕", "alias": "yun"},
  {"name": "吓死", "alias": "xiasi"},
  {"name": "好吃", "alias": "haochi"},
  {"name": "生气", "alias": "shengqi"},
  {
    "name": "崩溃",
    "otherNames": ["又死了"],
    "alias": "yousile"
  },
  {"name": "奋斗", "alias": "fendou"},
  {"name": "衰", "alias": "shuai"},
  {"name": "冷", "alias": "leng"},
  {"name": "骷髅", "alias": "kulou"},
  {"name": "心碎", "alias": "xinsui"},
  {"name": "瞌睡", "alias": "keshui"},
  {"name": "吐舌", "alias": "tushe"},
  {"name": "死了", "alias": "sile"},
  {"name": "惊悚", "alias": "jingsong"},
  {"name": "凶", "alias": "xiong"},
  {"name": "炸弹", "alias": "zhadan"},
  {"name": "失魄", "alias": "shipo"},
  {"name": "哼", "alias": "heng"},
  {"name": "睡着", "alias": "shuizhao"},
  {"name": "惊恐", "alias": "jingkong"},
  {"name": "骂人", "alias": "maren"},
  {"name": "讨厌", "alias": "taoyan"},
  {"name": "流口水", "alias": "liukoushui"},
  {"name": "受伤", "alias": "shoushang"},
  {
    "name": "困",
    "otherNames": ["睡醒"],
    "alias": "shuixing"
  },
  {"name": "呕吐", "alias": "outu"}
];

String getEmojiPath(String emojiAlias) {
  return 'assets/emoji/$emojiAlias.png';
}

class EmojiList extends StatelessWidget {
  final Function onSend;
  final Function onValueChanged;

  final TextEditingController inputController;

  EmojiList({this.onSend, this.inputController, this.onValueChanged});

  /// 插入表情
  void insertText(String text) {
    var value = inputController.value;
    var start = value.selection.baseOffset;
    var end = value.selection.extentOffset;

    if (value.selection.isValid) {
      String newText = "";
      if (value.selection.isCollapsed) {
        if (end > 0) {
          newText += value.text.substring(0, end);
        }
        newText += text;
        if (value.text.length > end) {
          newText += value.text.substring(end, value.text.length);
        }
      } else {
        newText = value.text.replaceRange(start, end, text);
        end = start;
      }

      inputController.value = value.copyWith(
          text: newText,
          selection: value.selection.copyWith(
              baseOffset: end + text.length, extentOffset: end + text.length));
    } else {
      String curText = inputController.text;
      inputController.value = value.copyWith(
          text: inputController.text + text,
          selection: value.selection.copyWith(
              baseOffset: curText.length + text.length,
              extentOffset: curText.length + text.length));
    }

    if (onValueChanged != null) {
      onValueChanged();
    }
  }

  /// 操作退格
  void onBackspace() {
    var value = inputController.value;
    var start;
    var end;
    String text = inputController.text;

    if (value.selection.isValid) {
      start = value.selection.baseOffset;
      end = value.selection.extentOffset;
    } else {
      start = end = text.length;
    }

    String newText = '';

    int offset = 0;

    String deleteText = text.substring(end - 1, end);
    if (deleteText == ']') {
      int lastIndex = text.lastIndexOf('[');

      newText = text.replaceRange(lastIndex, end, '');
      offset = lastIndex;
    } else {
      if (start == end) {
        newText = text.substring(0, end - 1) + text.substring(end);
        offset = end - 1;
      } else {
        newText = text.replaceRange(start, end, '');
        offset = start;
      }
    }

    inputController.value = value.copyWith(
        text: newText,
        selection:
            value.selection.copyWith(baseOffset: offset, extentOffset: offset));

    if (onValueChanged != null) {
      onValueChanged();
    }
  }

  @override
  Widget build(BuildContext context) {
    BoxDecoration decoration = BoxDecoration(
        color:
            inputController.text.isEmpty ? Color(0xffdedede) : Theme.of(context).primaryColorDark,
        borderRadius: BorderRadius.all(Radius.circular(100)),
        boxShadow: [
          BoxShadow(
              color: Colors.black.withOpacity(.16),
              offset: Offset(0, AdaptationUtils.setWidth(3)),
              blurRadius: AdaptationUtils.setWidth(6))
        ]);

    return Stack(
      children: <Widget>[
        // 表情
        GridView.builder(
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 7,
              crossAxisSpacing: AdaptationUtils.setWidth(20),
              mainAxisSpacing: AdaptationUtils.setWidth(20)),
          itemBuilder: (context, index) {
            String emojiName = emojiList[index]['name'];
            return Tooltip(
              message: emojiName,
              preferBelow: false,
              child: Container(
//                color: Colors.redAccent,
                child: GestureDetector(
                  child: Image.asset(
                    getEmojiPath(emojiList[index]['alias']),
                  ),
                  behavior: HitTestBehavior.translucent,
                  onTap: () {
                    insertText('[$emojiName]');

                  },
                ),
              ),
            );
          },
          itemCount: emojiList.length,
          padding: EdgeInsets.symmetric(
                  vertical: AdaptationUtils.setWidth(31),
                  horizontal: AdaptationUtils.setWidth(36))
              .copyWith(bottom: AdaptationUtils.setWidth(120)),
        ),

        // 操作按钮
        Positioned(
            right: 0,
            bottom: -5,
            child: Container(
              width: AdaptationUtils.setWidth(320),
              height: AdaptationUtils.setWidth(145),
              decoration: BoxDecoration(boxShadow: [
                BoxShadow(color: Colors.white.withOpacity(.9), blurRadius: 3)
              ]),
              padding: EdgeInsets.only(
                  right: AdaptationUtils.setWidth(30),
                  top: AdaptationUtils.setWidth(30)),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  // 退格
                  GestureDetector(
                    onTap: () {
                      if (inputController.text.isEmpty) {
                        return;
                      }

                      this.onBackspace();
                    },
                    child: Container(
                      width: AdaptationUtils.setWidth(90),
                      height: AdaptationUtils.setWidth(80),
                      margin:
                          EdgeInsets.only(right: AdaptationUtils.setWidth(20)),
                      decoration: decoration,
                      child: Icon(
                        Icons.backspace,
                        size: 20,
                        color: Colors.white,
                      ),
                    ),
                  ),

                  // 发送
                  GestureDetector(
                    onTap: () {
                      if (inputController.text.isEmpty) {
                        return;
                      }

                      this.onSend();
                    },
                    child: Container(
                      width: AdaptationUtils.setWidth(140),
                      height: AdaptationUtils.setWidth(80),
                      decoration: decoration,
                      alignment: Alignment.center,
                      child: Text(
                        '发送',
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 15,
                      ),
                    ),
                  ),
                  )],
              ),
            )),
      ],
    );
  }
}

/// 解析emoji
class EmojiText extends SpecialText {
  final double verticalMargin;

  static const String flag = "[";
  final int start;

  EmojiText(TextStyle textStyle, {this.start, this.verticalMargin = 0})
      : super(EmojiText.flag, "]", textStyle);

  @override
  InlineSpan finishText() {
    var key = toString();
    String content = getContent();

    var emoji = emojiList.firstWhere((emoji) {
      bool match = emoji['name'] == content;
      if (!match && emoji['otherNames'] != null) {
        match = emoji['otherNames'].contains(content);
      }
      return match;
    }, orElse: () => null);

    if (emoji != null) {
      final double size = AdaptationUtils.setWidth(38);

      return ImageSpan(AssetImage(getEmojiPath((emoji['alias']))),
          actualText: key,
          imageWidth: size,
          imageHeight: size,
          start: start,
          fit: BoxFit.fill,
          margin: EdgeInsets.symmetric(vertical: this.verticalMargin)
              .copyWith(left: 2.0, right: 2.0));
    }

    return TextSpan(text: toString(), style: textStyle);
  }
}

/// 特殊字符解析
class MySpecialTextSpanBuilder extends SpecialTextSpanBuilder {
  final double emojiVerticalMargin;

  MySpecialTextSpanBuilder({this.emojiVerticalMargin = 0});

  @override
  TextSpan build(String data, {TextStyle textStyle, onTap}) {
    TextSpan result = super.build(data, textStyle: textStyle, onTap: onTap);
    return result;
  }

  @override
  SpecialText createSpecialText(String flag,
      {TextStyle textStyle, SpecialTextGestureTapCallback onTap, int index}) {
    if (flag == null || flag == "") return null;

    ///index is end index of start flag, so text start index should be index-(flag.length-1)
    if (isStart(flag, EmojiText.flag)) {
      return EmojiText(textStyle,
          start: index - (EmojiText.flag.length - 1),
          verticalMargin: emojiVerticalMargin);
    }
    return null;
  }
}
