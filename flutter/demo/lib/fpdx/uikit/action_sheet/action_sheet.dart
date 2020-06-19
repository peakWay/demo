/// describe
///
/// created by simiaodong
/// created at 2019-09-04
//

import 'package:flutter/material.dart';
import 'package:demo/fpdx/utils/adaptation.dart';

/// 操作项类型
enum ActionSheetActionType {
  /// 纯文字
  Text,

  /// 文字前面带Icon
  TextWithIcon
}

/// 操作项
class ActionSheetAction {
  ActionSheetActionType type;
  String text;
  Widget icon;
  Function onTap;

  ActionSheetAction(
      {this.type = ActionSheetActionType.Text,
      this.text = '',
      this.icon,
      this.onTap});
}

/// 底部动作栏容器组件
class ActionSheet extends StatelessWidget {
  ActionSheet(
      {this.title,
      this.actions,
      this.showDivider = true,
      this.showCancel = true,
      this.onTap,
      this.textStyle});

  /// 标题
  final Widget title;

  /// 动作列表
  final List<ActionSheetAction> actions;

  /// 是否显示分割线
  final bool showDivider;

  /// 是否最后一个action为关闭按钮
  final bool showCancel;

  /// 选择回调
  final Function(int) onTap;

  final TextStyle textStyle;

  /// 显示一个ActionSheet
  static void show(BuildContext context,
      {Widget title,
      List<ActionSheetAction> actions,
      bool showDivider = true,
      bool showCancel = true,
      TextStyle textStyle,
      Function(int) onTap}) {
    showModalBottomSheet(
        context: context,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.only(
              topLeft: Radius.circular(AdaptationUtils.px(10)),
              topRight: Radius.circular(AdaptationUtils.px(10))),
        ),
        backgroundColor: Colors.white,
        builder: (_) => ActionSheet(
              title: title,
              actions: actions,
              showDivider: showDivider,
              showCancel: showCancel,
              textStyle: textStyle,
            ));
  }

  final Widget divider = Divider(
    height: 0.5,
    color: Colors.black.withOpacity(.1),
  );

  Widget _buildAction(BuildContext context, ActionSheetAction action,
      {EdgeInsets contentPadding}) {
    return ListTile(
      title: Text(
        action.text ?? '',
        textAlign: action.type == ActionSheetActionType.Text
            ? TextAlign.center
            : TextAlign.left,
        style: this.textStyle ??
            TextStyle(
                color: Color(0xff333333), fontSize: AdaptationUtils.px(30)),
      ),
      leading: action.icon != null
          ? FractionallySizedBox(
              heightFactor: 1,
              child: action.icon,
            )
          : null,
      onTap: () {
        Navigator.of(context).pop();
        if (action.onTap != null) action.onTap();
      },
      contentPadding: contentPadding,
    );
  }

  List<Widget> _buildList(BuildContext context) {
    List<Widget> widgetList = [];

    // 标题
    if (this.title != null)
      widgetList.addAll([
        Container(
          child: this.title,
          padding: EdgeInsets.symmetric(vertical: AdaptationUtils.px(16)),
          color: Colors.white,
        ),
        divider,
      ]);

    if (this.actions != null) {
      for (int i = 0; i < this.actions.length; i++) {
        widgetList.add(this._buildAction(context, this.actions[i]));

        if (this.showDivider && i != this.actions.length - 1) {
          widgetList.add(divider);
        }
      }
    }

    // 底部安全区域
    double paddingBottom = MediaQuery.of(context).padding.bottom;

    // 取消按钮
    if (this.showCancel) {
      widgetList.add(Divider(
        thickness: AdaptationUtils.px(6),
        height: AdaptationUtils.px(6),
        color: Color.fromRGBO(237, 237, 237, 1),
      ));
      widgetList.add(this._buildAction(context, ActionSheetAction(text: '取消'),
          contentPadding: EdgeInsets.only(bottom: paddingBottom)));
    } else {
      // 不带关闭按钮的, 插入一个安全区占位
      widgetList.add(Padding(
        padding: EdgeInsets.only(top: paddingBottom),
      ));
    }

    return widgetList;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: this._buildList(context),
    );
  }
}

/// 底部动作栏子项
class ActionSheetItem extends StatelessWidget {
  final Widget child;
  final Function onTap;
  final bool closeOnTap;

  ActionSheetItem({this.child, this.onTap, this.closeOnTap = true});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        if (this.closeOnTap) {
          Navigator.of(context).pop();
        }

        if (this.onTap != null) {
          this.onTap();
        }
      },
      child: FractionallySizedBox(
        widthFactor: 1,
        child: Container(
          padding: const EdgeInsets.all(16),
          color: Colors.white,
          child: child,
        ),
      ),
    );
  }
}

/// 文字居中样式
class ActionSheetTextItem extends StatelessWidget {
  final String text;
  final Function onTap;
  final bool closeOnTap;

  ActionSheetTextItem({this.text, this.onTap, this.closeOnTap = true});

  @override
  Widget build(BuildContext context) {
    return ActionSheetItem(
      child: Text(
        this.text,
        style: TextStyle(fontSize: 17, fontWeight: FontWeight.w500),
        textAlign: TextAlign.center,
      ),
      onTap: () {
        if (this.onTap != null) {
          this.onTap();
        }
      },
      closeOnTap: closeOnTap,
    );
  }
}
