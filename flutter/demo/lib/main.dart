import 'package:demo/base-lib/components/chat_message/chat_image_message.dart';
import 'package:demo/base-lib/components/chat_message/chat_message.dart';
import 'package:demo/base-lib/components/chat_message/chat_message_tooltip.dart';
import 'package:demo/base-lib/components/chat_message/chat_notice_message.dart';
import 'package:demo/base-lib/components/chat_message/chat_text_message.dart';
import 'package:demo/base-lib/components/chat_message/chat_time_message.dart';
import 'package:demo/base-lib/components/chat_message/chat_voice_message.dart';
import 'package:demo/base-lib/components/temp.dart';
import 'package:demo/base-lib/view/temp.dart';
import 'package:demo/fpdx/constants/style.dart';
import 'package:demo/pub-components/easy-refresh.dart';
import 'package:flutter/material.dart';
import 'dart:math' as math;
import 'package:demo/fpdx/uikit/action_sheet/action_sheet.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:demo/fpdx/uikit/tabbar/tabbar.dart';
import 'package:demo/fpdx/components/task.dart';
import 'package:demo/base-lib/view/context.dart';
import 'package:demo/fpdx/components/setting-cell.dart';
import 'package:demo/base-lib/components/custom-button.dart';
import 'package:flutter_easyrefresh/easy_refresh.dart';
import 'package:flutter_easyrefresh/material_header.dart';
import 'package:flutter_easyrefresh/material_footer.dart';
import 'dart:ui' as ui show window;





class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {

    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(title: Text('demo')),
        body: Center(
          child: BaseWidget(),
        ),
        backgroundColor: Color(0xFFF9F9FB),
      ),
    );
  }
}

class BaseWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    ScreenUtil.init(context, width: 750, height: 1334);

    return Column(
      children: <Widget>[
        // MessageTooltip()
        // Form(),
        // TextFormField
        // LinearProgressIndicator(
        //   backgroundColor: Colors.grey[200],
        //   valueColor: AlwaysStoppedAnimation(Colors.blue),
        // ),
        // //进度条显示50%
        Container(
          width: double.infinity,
          height: 200.w,
          alignment: Alignment.center,
          color: Colors.lightGreen,
          child: Text('列表组件', style: TextStyle(fontSize: 40.sp, color: Colors.white)),
        ),
        
// LineAnimate(),
        Expanded(
          child: _Example(),
        )
      ],
    );
  }
}

class LineAnimate extends StatefulWidget {
  @override
  _LineAnimateState createState() => _LineAnimateState();
}

class _LineAnimateState extends State<LineAnimate> with TickerProviderStateMixin{

  AnimationController controller;
  Animation<double> animation;
  

  @override
  void initState() {
    super.initState();

    controller = new AnimationController(
        duration: const Duration(milliseconds: 800), vsync: this);

    animation = Tween<double>(
      begin: 4.w, 
      end: MediaQueryData.fromWindow(ui.window).size.width
    ).animate(
      CurvedAnimation(parent: controller, curve: Curves.ease)
    )..addListener(() {
      setState(() {});
    })..addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        controller.repeat();
      }
    });

    controller.forward();
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }


  @override
  Widget build(BuildContext context) {
    return Container(
      width: animation.value,
      height: 10.w,
      color: MyColors.primary
    );
  }
}


class _Example extends StatefulWidget {
  @override
  _ExampleState createState() {
    return _ExampleState();
  }
}

class _ExampleState extends State<_Example> {
  
  EasyRefreshController _controller;

  // 条目总数
  int _count = 20;

  @override
  void initState() {
    super.initState();
    _controller = EasyRefreshController();
  }

  @override
  Widget build(BuildContext context) {
  //   List<String> addStr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  // List<String> str = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  // GlobalKey<EasyRefreshState> _easyRefreshKey =
  //     new GlobalKey<EasyRefreshState>();
  // GlobalKey<RefreshHeaderState> _headerKey =
  //     new GlobalKey<RefreshHeaderState>();
  // GlobalKey<RefreshFooterState> _footerKey =
  //     new GlobalKey<RefreshFooterState>();


  //   return new EasyRefresh(
  //       key: _easyRefreshKey,
  //       behavior: ScrollOverBehavior(),
  //       refreshHeader: ClassicsHeader(
  //         key: _headerKey,
  //         bgColor: Colors.transparent,
  //         textColor: Colors.black87,
  //         moreInfoColor: Colors.black54,
  //         showMore: true,
  //       ),
  //       refreshFooter: ClassicsFooter(
  //         key: _footerKey,
  //         bgColor: Colors.transparent,
  //         textColor: Colors.black87,
  //         moreInfoColor: Colors.black54,
  //         showMore: true,
  //       ),
  //       child: new ListView.builder(
  //           //ListView的Item
  //           itemCount: str.length,
  //           itemBuilder: (BuildContext context, int index) {
  //             return new Container(
  //                 height: 70.0,
  //                 child: Card(
  //                   child: new Center(
  //                     child: new Text(
  //                       str[index],
  //                       style: new TextStyle(fontSize: 18.0),
  //                     ),
  //                   ),
  //                 ));
  //           }),
  //       onRefresh: () async {
  //         await new Future.delayed(const Duration(seconds: 1), () {
  //           setState(() {
  //             str.clear();
  //             str.addAll(addStr);
  //           });
  //         }
  //     );
  //       });

    return EasyRefresh.custom(
          enableControlFinishRefresh: false,
          enableControlFinishLoad: true,
          controller: _controller,
          header: CustomRefreshHeader(
            extent: 10.w
          ),
          
          // CustomHeader(
          //   extent: 10.w,
          //   headerBuilder: (context, refreshState, pulledExtent, refreshTriggerPullDistance, refreshIndicatorExtent, axisDirection, float, completeDuration, enableInfiniteRefresh, success, noMore) {
          //       print('$refreshState, refreshState');

          //       return refreshState == RefreshMode.armed || refreshState == RefreshMode.refresh
          //           ? LineAnimate()
          //           : SizedBox();
          //   }
          // ),
          footer: ClassicalFooter(),
          onRefresh: () async {
            await Future.delayed(Duration(seconds: 2), () {
              print('onRefresh');
              setState(() {
                _count = 20;
              });
              _controller.resetLoadState();
            });
          },
          onLoad: () async {
            await Future.delayed(Duration(seconds: 2), () {
              print('onLoad');
              setState(() {
                _count += 10;
              });
              _controller.finishLoad(noMore: _count >= 40);
            });
          },
          slivers: <Widget>[
            SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  return Container(
                    width: 60.0,
                    height: 60.0,
                    child: Center(
                      child: Text('$index'),
                    ),
                    color:
                        index % 2 == 0 ? Colors.grey[300] : Colors.transparent,
                  );
                },
                childCount: _count,
              ),
            ),
          ],
        );

    // return Scaffold(
    //     appBar: AppBar(
    //       title: Text("EasyRefresh"),
    //     ),
    //     body: ,
    //     persistentFooterButtons: <Widget>[
    //       FlatButton(
    //           onPressed: () {
    //             _controller.callRefresh();
    //           },
    //           child: Text("Refresh", style: TextStyle(color: Colors.black))),
    //       FlatButton(
    //           onPressed: () {
    //             _controller.callLoad();
    //           },
    //           child: Text("Load more", style: TextStyle(color: Colors.black))),
    //     ]);
  }
}







void main() => runApp(MyApp());





