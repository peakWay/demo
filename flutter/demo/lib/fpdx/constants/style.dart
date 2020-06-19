/// 一些样式常量, 颜色, 字号等
///
/// created by simiaodong
/// created at 2019-08-10
//

import 'package:flutter/material.dart';
import 'package:demo/fpdx/utils/adaptation.dart';

class MyColors {
  /// 主体色, 品牌色
  static const Color primary = Color(0xffFF7E98);
  static const Color vip = Color(0xFFE1C285);

  /// 文字颜色

  /// 主要
  static const Color textPrimary = Color(0xff333333);

  /// 常规颜色
  static const Color textNormal = Color(0xff666666);

  /// 次要
  static const Color textMinor = Color(0xff999999);

  /// 页面背景颜色
  static const Color bgPrimary = Colors.white;
  static const Color bgMinor = Color(0xFFFAFAFA);

  /// 其他颜色
  static const Color bannerColor = Color(0xfff97f8e);

  /// 微信主题色
  static const Color wxColor = Color(0xFF9ADB68);

  /// 分割线颜色
  static const lineColor = Color(0xFFF3F4F5);

  /// forward 箭头颜色
  static const forwardArrowColor = Color(0xFFAAAAAA);

  /// 用户标签颜色
  static Map<String, Map<String, Color>> userTagColor = {
    'desc': {'text': Color(0xffFC9BAE), 'bg': Color(0xffFFF2F4)},
    'chat': {'text': Color(0xffFDA9D3), 'bg': Color(0xffFED7EA).withOpacity(.2)},
    'music': {'text': Color(0xff778CFF), 'bg': Color(0xffEBEEFD)},
    'sport': {'text': Color(0xff69D7FF), 'bg': Color(0xffE0F7FF)},
    'claim': {'text': Color(0xff4DD0CD), 'bg': Color(0xff8CE6E4).withOpacity(.2)},
    'status': {'text': Color(0xffFFB079), 'bg': Color(0xffF7CFB3).withOpacity(.2)}
  };


   /// 装饰背景色
  static List mottoBgColorList = [
    Color(0xFF62D1FF),
    Color(0xFF6840FF),
    Color(0xFFFC8CA3),
    Color(0xFFFF8F40),
    Color(0xFF38FFFB),
    Color(0xFF62FFAA),
    Color(0xFFFFA5FF),
  ];



}

/// 字重
class MyFontWeight {
  static const FontWeight normal = FontWeight.w400;
  static const FontWeight medium = FontWeight.w500;
  static const FontWeight bold = FontWeight.bold;
}

/// 阴影
class MyShadows {
  /// 为了凸显某个区块, 所加的阴影
  static const BoxShadow blockShadow = BoxShadow(
      color: Color.fromRGBO(51, 51, 51, .1),
      offset: Offset(0, 1),
      blurRadius: 4);
}

/// 各种尺寸
class MySize {
  /// 页边距
  static const double pagePadding = 16;

  /// 用户信息卡片高度
  static double userInfoCellHeight = AdaptationUtils.setWidth(165);
}
