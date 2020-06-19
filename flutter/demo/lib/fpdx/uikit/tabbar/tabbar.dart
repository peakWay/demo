/// tabbar
///
/// created by simiaodong
/// created at 2020/5/6
//

import 'package:flutter/material.dart';
import 'package:demo/fpdx/constants/style.dart';
import 'package:demo/fpdx/uikit/tabbar/scale_tabbar.dart';
import 'package:demo/fpdx/uikit/tabbar/underline_tab_indicator.dart';
import 'package:demo/fpdx/utils/adaptation.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';


class XTabBar extends StatelessWidget {
  final TabController controller;
  final List<Tab> tabs;
  final TextStyle labelStyle;
  final TextStyle unselectedLabelStyle;
  final Color indicatorColor;
  final Decoration indicator;
  final double indicatorWeight;
  final TabBarIndicatorSize indicatorSize;
  final bool isScrollable;
  final double indicatorWidth;

  XTabBar(
      {this.controller,
      this.tabs,
      this.labelStyle,
      this.unselectedLabelStyle,
      this.indicatorColor,
      this.indicator,
      this.indicatorWeight,
      this.indicatorSize = TabBarIndicatorSize.label,
      this.isScrollable = true,
      this.indicatorWidth});

  @override
  Widget build(BuildContext context) {
    TextStyle finalLabelStyle = TextStyle(
        fontSize: AdaptationUtils.px(36),
        color: MyColors.textPrimary,
        fontWeight: FontWeight.w500);
    if (this.labelStyle != null) {
      finalLabelStyle = finalLabelStyle.merge(this.labelStyle);
    }

    TextStyle finalUnselectedLabelStyle =
        TextStyle(fontSize: AdaptationUtils.px(30), color: Color(0xff999999));
    if (this.unselectedLabelStyle != null) {
      finalUnselectedLabelStyle =
          finalUnselectedLabelStyle.merge(this.unselectedLabelStyle);
    }

    return Theme(
      data: ThemeData(
          highlightColor: Colors.transparent, splashColor: Colors.transparent),
      child: ScaleTabBar(
          isScrollable: isScrollable,
          indicatorSize: indicatorSize,
          indicatorWeight: indicatorWeight ?? AdaptationUtils.px(8),
          labelPadding:
              EdgeInsets.symmetric(horizontal: AdaptationUtils.px(36)),
          controller: controller,
          labelStyle: finalLabelStyle,
          labelColor: finalLabelStyle.color ?? MyColors.textPrimary,
          unselectedLabelStyle: finalUnselectedLabelStyle,
          unselectedLabelColor:
              finalUnselectedLabelStyle.color ?? MyColors.textMinor,
          tabs: tabs,
          indicator: this.indicator ??
              XUnderlineTabIndicator(
                width: this.indicatorWidth ?? 24.w,
                borderSide: BorderSide(
                  width: AdaptationUtils.px(8),
                  color: this.indicatorColor ?? MyColors.primary,
                ),
              )),
    );
  }
}
