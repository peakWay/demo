
/**
 * 一些原生控件
 */


import 'package:flutter/material.dart';

class TTabBar extends StatefulWidget {
  @override
  _TTabBarState createState() => _TTabBarState();
}

class _TTabBarState extends State<TTabBar> with SingleTickerProviderStateMixin{

  TabController controller;
  List<Tab> tabs;

  @override
  void initState() {
    super.initState();

    TextStyle textstyle = TextStyle(color: Colors.black);

    tabs = <Tab>[
      Tab(child: Text('Tab1', style: textstyle)),
      Tab(child: Text('Tab2', style: textstyle)),
      Tab(child: Text('Tab3', style: textstyle)),
    ];

    controller = TabController(initialIndex: 0, length: tabs.length, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return TabBar(
      controller: controller,
      tabs: tabs,
      isScrollable: false,   
      indicatorWeight: 10,   //底部线长度
      indicatorSize: TabBarIndicatorSize.tab,
      indicatorPadding: EdgeInsets.only(right: 20, bottom: 20),
    );
  }
}