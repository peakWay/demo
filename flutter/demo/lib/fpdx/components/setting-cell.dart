
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:demo/fpdx/components/switch.dart';

class Cell extends StatelessWidget {
  Cell({
    Key key,
    this.leading,
    this.title,
    this.subtitle,
    this.trailing,
    this.contentPadding = EdgeInsets.zero,
    this.titlePadding = EdgeInsets.zero,
    this.onTap,
    this.trailingIcon,
    this.defaultTrailingIcon = false
  }) : assert(trailingIcon == null || defaultTrailingIcon == false),
       super(key: key);

  final Widget leading;
  final Widget title;
  final Widget subtitle;
  final Widget trailing;
  final EdgeInsetsGeometry contentPadding;
  final EdgeInsetsGeometry titlePadding;
  final GestureTapCallback onTap;
  final Icon trailingIcon;
  final defaultTrailingIcon;

  Widget _getTrailing() {

    if (trailingIcon == null && trailing == null && !defaultTrailingIcon) return SizedBox();

    Widget _defaultTrailingIcon = Icon(Icons.arrow_forward_ios, size: 24.w, color: Color(0xFF999999));

    return  (defaultTrailingIcon || trailingIcon != null) && trailing != null 
            ? Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  trailing,
                  trailingIcon ?? _defaultTrailingIcon
                ],
              )
            : trailing ?? trailingIcon ?? _defaultTrailingIcon;
  }

  Widget _getTitle() {
    return  subtitle != null
            ? Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  title,
                  subtitle
                ],
              )
            : title;
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      child: Padding(
        padding: contentPadding,
        child: Row(
          children: <Widget>[
            leading ?? SizedBox(),
            Expanded(
              child: Padding(
                padding: titlePadding,
                child: _getTitle(),
              ),
            ),
            _getTrailing()
          ],
        ),
      ),
      onTap: onTap,
    );
  }
}

class SettingCell extends StatefulWidget {
  @override
  _SettingCellState createState() => _SettingCellState();
}

class _SettingCellState extends State<SettingCell> {
  bool isHidden = false;

  TextStyle _textStyle = TextStyle(
    fontSize: 28.sp,
    color: Color(0xFF000000)
  );

  Widget _getLeading(IconData icon) {
    return Container(
      width: 56.w,
      height: 56.w,
      decoration: BoxDecoration(
        color: Color(0xFFF3F4F5),
        borderRadius: BorderRadius.circular(28.w)
      ),
      child: Icon(icon, size: 14),
    );
  } 

  Cell _getSettingItem({String text, GestureTapCallback onTap, trailing}) {
    return Cell(
      leading: _getLeading(Icons.ac_unit),
      titlePadding: EdgeInsets.symmetric(horizontal: 14.w),
      title: Text('$text', overflow: TextOverflow.ellipsis, style: _textStyle),
      trailing: trailing,
      defaultTrailingIcon: true,
      contentPadding: EdgeInsets.symmetric(horizontal: 30.w, vertical: 28.w),
      onTap: onTap
    );
  }

  @override
  Widget build(BuildContext context) {

    return Column(
      children: <Widget>[
        _getSettingItem(
          text: '编辑个人资料',
          onTap: () => {
            //TODO: 去编辑个人资料
          }
        ),
        _getSettingItem(
          text: '通知开关设置',
          onTap: () => {
            //TODO: 通知开关设置
          }
        ),
        _getSettingItem(
          text: '向我展示设置',
          onTap: () => {
            //TODO: 向我展示设置
          }
        ),
        _getSettingItem(
          text: '客服反馈',
          onTap: () => {
            //TODO: 客服反馈
          }
        ),
        _getSettingItem(
          text: '账号与安全',
          onTap: () => {
            //TODO: 账号与安全
          }
        ),
        _getSettingItem(
          text: '版本',
          trailing: Row(
            children: <Widget>[
              ClipOval(
                child: Container(
                  width: 9.w,
                  height: 9.w,
                  color: Color(0xFFFF5555),
                )
              ),
              Padding(
                padding: EdgeInsets.only(left: 6),
                child: Text('V1.9.0', style: TextStyle(
                  fontSize: 26.sp,
                  color: Color(0xFF999999)
                ))
              )
            ],
          ),
          onTap: () => {
            //TODO: 账号与安全
          }
        ),
        Stack(
          children: <Widget>[
            Cell(
              leading: _getLeading(Icons.ac_unit),
              titlePadding: EdgeInsets.symmetric(horizontal: 14.w),
              title: Text('开启隐身模式', overflow: TextOverflow.ellipsis, style: _textStyle),
              trailing: CustomSwitch(
                value: isHidden,
                trackColor: Color(0xFFF3F4F5),
                activeColor: Colors.red,
                trackWidth: 70.w,
                trackHeight: 40.w,
                onChanged: (bool value) {
                  setState(() {
                    isHidden = value;
                  });
                },
              ),
              contentPadding: EdgeInsets.symmetric(horizontal: 30.w, vertical: 20.w),
            ),
            Positioned(
              left: 100.w,
              bottom: 4.w,
              child: Text(
                '隐身模式开启后，你将不会被推荐给别人',
                style: TextStyle(
                  fontSize: 22.sp,
                  color: Color(0xFF999999)
                )
              ),
            )
          ],
        ),
        //TODO: 还有个按钮
      ],
    );
  }
}
