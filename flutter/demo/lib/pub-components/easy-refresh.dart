import 'package:flutter/material.dart';
import 'package:flutter_easyrefresh/easy_refresh.dart';
import 'dart:ui' as ui show window;
import 'package:flutter_screenutil/flutter_screenutil.dart';

abstract class GeneralListViewState<T extends StatefulWidget> extends State<T>{

  Future onLoad();

  Future onRefresh();

  Widget builder();

  void onScroll() {

  }

  Widget emptyWidget;

  Widget firstRefreshWidget;

  ///加载底部距离
  static const loadDistance = 100;
  
  EasyRefreshController _controller;

  ScrollController _scrollController;

  ///当前滚动位置
  double offset = 0;

  ///内容高度
  double contentHeight = 0;

  ///是否提前加载
  bool _isAdvanceLoad = false;

  bool _noMore = false;

  Widget child;

  @override
  void initState() {
    super.initState();
    _controller = EasyRefreshController();
  }

  //滚动到某个位置
  void animateTo(double offset, [Duration duration, Curve curve] ) {
    _scrollController.animateTo(offset, duration: duration ?? Duration(milliseconds: 300), curve: Curves.easeIn);
  }

  //设置无更多
  void setNoMore() {
    _noMore = true;
  }

  @override
  Widget build(BuildContext context) {
    return NotificationListener<ScrollNotification>(
      onNotification: (ScrollNotification notification) {

        offset = notification.metrics.pixels;
        // print(offset);

        contentHeight = notification.metrics.maxScrollExtent;

        onScroll();

        //距离底部多远自动加载
        if (contentHeight - offset <= loadDistance && !_isAdvanceLoad) {
          // _isAdvanceLoad = true;
          // _controller.callLoad();
        }
      
        // return true; 
      },
      child: EasyRefresh(
        enableControlFinishRefresh: false,
        enableControlFinishLoad: true,
        controller: _controller,
        scrollController: _scrollController,
        header: CustomRefreshHeader(
          extent: 10.w
        ),
        firstRefreshWidget: firstRefreshWidget,
        emptyWidget: emptyWidget,
        
        // _isAdvanceLoad ? 0 : 20
        footer: CustomLoadFooter(
          extent: _noMore ? 0 : 70.w,
          isAdvance: _isAdvanceLoad,
        ),
        onRefresh: () async {
          await onRefresh();

          _controller.resetLoadState();
        },
        onLoad: () async {
          await onLoad();

          _controller.finishLoad(noMore: _noMore);

          // if (_isAdvanceLoad = true) _isAdvanceLoad = false;
        },
        child: builder()
      )
    );
  }
}

/// 自定义header
class CustomRefreshHeader extends Header {
  /// Key
  final Key key;

  /// 背景颜色
  final Color bgColor;

  CustomRefreshHeader({
    double extent = 60.0,
    double triggerDistance = 70.0,
    bool float = false,
    Duration completeDuration = const Duration(seconds: 1),
    bool enableInfiniteRefresh = false,
    bool enableHapticFeedback = true,
    bool overScroll = true,
    this.key,
    this.bgColor: Colors.transparent,
  }) : super(
          extent: extent,
          triggerDistance: triggerDistance,
          float: float,
          completeDuration: float
              ? completeDuration == null
                  ? Duration(
                      milliseconds: 400,
                    )
                  : completeDuration +
                      Duration(
                        milliseconds: 400,
                      )
              : completeDuration,
          enableInfiniteRefresh: enableInfiniteRefresh,
          enableHapticFeedback: enableHapticFeedback,
          overScroll: overScroll,
        );

  @override
  Widget contentBuilder(
      BuildContext context,
      RefreshMode refreshState,
      double pulledExtent,
      double refreshTriggerPullDistance,
      double refreshIndicatorExtent,
      AxisDirection axisDirection,
      bool float,
      Duration completeDuration,
      bool enableInfiniteRefresh,
      bool success,
      bool noMore,
      ) {
    return CustomRefreshHeaderWidget(
      key: key,
      customRefreshHeader: this,
      refreshState: refreshState,
      pulledExtent: pulledExtent,
      refreshTriggerPullDistance: refreshTriggerPullDistance,
      refreshIndicatorExtent: refreshIndicatorExtent,
      axisDirection: axisDirection,
      float: float,
      extent: extent,
      completeDuration: completeDuration,
      enableInfiniteRefresh: enableInfiniteRefresh,
      success: success,
      noMore: noMore,
    );
  }
}

/// 自定义Header组件
class CustomRefreshHeaderWidget extends StatefulWidget {
  final CustomRefreshHeader customRefreshHeader;
  final RefreshMode refreshState;
  final double pulledExtent;
  final double refreshTriggerPullDistance;
  final double refreshIndicatorExtent;
  final AxisDirection axisDirection;
  final bool float;
  final Duration completeDuration;
  final bool enableInfiniteRefresh;
  final bool success;
  final bool noMore;
  final double extent;

  CustomRefreshHeaderWidget(
      {Key key,
      this.refreshState,
      this.customRefreshHeader,
      this.pulledExtent,
      this.refreshTriggerPullDistance,
      this.refreshIndicatorExtent,
      this.axisDirection,
      this.float,
      this.completeDuration,
      this.enableInfiniteRefresh,
      this.success,
      this.noMore,
      this.extent
      })
      : super(key: key);

  @override
  CustomRefreshHeaderWidgetState createState() => CustomRefreshHeaderWidgetState();
}

class CustomRefreshHeaderWidgetState extends State<CustomRefreshHeaderWidget>
    with TickerProviderStateMixin<CustomRefreshHeaderWidget> {
  // 是否到达触发刷新距离
  // bool _overTriggerDistance = false;

  // bool get overTriggerDistance => _overTriggerDistance;

  // set overTriggerDistance(bool over) {
  //   if (_overTriggerDistance != over) {
      // _overTriggerDistance
      //     ? _readyController.forward()
      //     : _restoreController.forward();
      // _overTriggerDistance = over;
  //   }
  // }

  // 是否刷新完成
  bool _loadFinish = false;

  set loadFinish(bool finish) {
    if (_loadFinish != finish) {
      if (finish && widget.float) {
        Future.delayed(widget.completeDuration - Duration(milliseconds: 400),
            () {
          if (mounted) {
            // _floatBackController.forward();
          }
        });
        Future.delayed(widget.completeDuration, () {
          // _floatBackDistance = null;
          _loadFinish = false;
        });
      }
      _loadFinish = finish;
    }
  }

  // 动画
  // AnimationController _readyController;
  // Animation<double> _readyAnimation;
  // AnimationController _restoreController;
  // Animation<double> _restoreAnimation;
  // AnimationController _floatBackController;
  // Animation<double> _floatBackAnimation;
  AnimationController _lineController;
  Animation<double> _lineAnimation;

  @override
  void initState() {
    super.initState();
    
    // 准备动画
    // _readyController = new AnimationController(
    //     duration: const Duration(milliseconds: 200), vsync: this);
    // _readyAnimation = new Tween(begin: 0.5, end: 1.0).animate(_readyController)
    //   ..addListener(() {
    //     setState(() {
    //       if (_readyAnimation.status != AnimationStatus.dismissed) {
    //       }
    //     });
    //   });
    // _readyAnimation.addStatusListener((status) {
    //   if (status == AnimationStatus.completed) {
    //     _readyController.reset();
    //   }
    // });
    // 恢复动画
    // _restoreController = new AnimationController(
    //     duration: const Duration(milliseconds: 200), vsync: this);
    // _restoreAnimation =
    //     new Tween(begin: 1.0, end: 0.5).animate(_restoreController)
    //       ..addListener(() {
    //         setState(() {
    //           if (_restoreAnimation.status != AnimationStatus.dismissed) {
    //           }
    //         });
    //       });
    // _restoreAnimation.addStatusListener((status) {
    //   if (status == AnimationStatus.completed) {
    //     _restoreController.reset();
    //   }
    // });
    // float收起动画
    // _floatBackController = new AnimationController(
    //     duration: const Duration(milliseconds: 300), vsync: this);
    // _floatBackAnimation =
    //     new Tween(begin: widget.refreshIndicatorExtent, end: 0.0)
    //         .animate(_floatBackController)
    //           ..addListener(() {
    //             setState(() {
    //               if (_floatBackAnimation.status != AnimationStatus.dismissed) {
    //                 // _floatBackDistance = _floatBackAnimation.value;
    //               }
    //             });
    //           });
    // _floatBackAnimation.addStatusListener((status) {
    //   if (status == AnimationStatus.completed) {
    //     _floatBackController.reset();
    //   }
    // });

    // 自定义线条动画
    _lineController = new AnimationController(
        duration: const Duration(milliseconds: 800), vsync: this);

    _lineAnimation = Tween<double>(
        begin: 4.w, 
        end: MediaQueryData.fromWindow(ui.window).size.width
      ).animate(
        CurvedAnimation(parent: _lineController, curve: Curves.ease)
      )..addListener(() {
        setState(() {});
      })..addStatusListener((status) {
        if (status == AnimationStatus.completed) {
          _lineController.repeat();
        }
      }
    );
  }

  @override
  void dispose() {
    // _readyController.dispose();
    // _restoreController.dispose();
    // _floatBackController.dispose();
    _lineController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    print('${widget.refreshState}');
    // 是否到达触发刷新距离
    // overTriggerDistance = widget.refreshState != RefreshMode.inactive &&
        // widget.pulledExtent >= widget.refreshTriggerPullDistance;

    if (widget.refreshState == RefreshMode.armed) {
      _lineController.forward();
    }
    if (widget.refreshState == RefreshMode.refreshed) {
      loadFinish = true;
    }
    if (widget.refreshState == RefreshMode.inactive) {
      _lineController.reset();
    }
    return Stack(
      children: <Widget>[
        Positioned(
          child: Container(
            width:double.infinity,
            height: double.infinity,
            color: widget.customRefreshHeader.bgColor,
            child: Center(
              child: Container(
                width: _lineAnimation.value,
                height: widget.extent,
                color: Colors.red
              ),
            )
          ),
        ),
      ],
    );
  }
}




/// 自定义footer
class CustomLoadFooter extends Footer {
  /// Key
  final Key key;

  /// 背景颜色
  final Color bgColor;

  /// 是否提前
  final bool isAdvance;

  CustomLoadFooter({
    double extent = 60.0,
    double triggerDistance = 70.0,
    bool float = false,
    Duration completeDuration = const Duration(seconds: 1),
    bool enableInfiniteLoad = true,
    bool enableHapticFeedback = true,
    bool overScroll = false,
    bool safeArea = true,
    EdgeInsets padding,
    this.key,
    this.isAdvance,
    this.bgColor: Colors.transparent,
  }) : super(
          extent: extent,
          triggerDistance: triggerDistance,
          float: isAdvance ? true : float,
          completeDuration: completeDuration,
          enableInfiniteLoad: enableInfiniteLoad,
          enableHapticFeedback: enableHapticFeedback,
          overScroll: overScroll,
          safeArea: safeArea,
          padding: padding,
        );

  @override
  Widget contentBuilder(
      BuildContext context,
      LoadMode loadState,
      double pulledExtent,
      double loadTriggerPullDistance,
      double loadIndicatorExtent,
      AxisDirection axisDirection,
      bool float,
      Duration completeDuration,
      bool enableInfiniteLoad,
      bool success,
      bool noMore) {
    return CustomLoadFooterWidget(
      key: key,
      customLoadFooter: this,
      loadState: loadState,
      pulledExtent: pulledExtent,
      loadTriggerPullDistance: loadTriggerPullDistance,
      loadIndicatorExtent: loadIndicatorExtent,
      axisDirection: axisDirection,
      float: float,
      extent: extent,
      completeDuration: completeDuration,
      enableInfiniteLoad: enableInfiniteLoad,
      success: success,
      noMore: noMore,
      isAdvance: isAdvance
    );
  }
}

/// 自定义Footer组件
class CustomLoadFooterWidget extends StatefulWidget {
  final CustomLoadFooter customLoadFooter;
  final LoadMode loadState;
  final double pulledExtent;
  final double loadTriggerPullDistance;
  final double loadIndicatorExtent;
  final AxisDirection axisDirection;
  final bool float;
  final Duration completeDuration;
  final bool enableInfiniteLoad;
  final bool success;
  final bool noMore;
  final double extent;
  final bool isAdvance;

  CustomLoadFooterWidget(
      {Key key,
      this.loadState,
      this.customLoadFooter,
      this.pulledExtent,
      this.loadTriggerPullDistance,
      this.loadIndicatorExtent,
      this.axisDirection,
      this.float,
      this.completeDuration,
      this.enableInfiniteLoad,
      this.success,
      this.extent,
      this.isAdvance,
      this.noMore})
      : super(key: key);


  @override
  CustomLoadFooterWidgetState createState() => CustomLoadFooterWidgetState();
}

class CustomLoadFooterWidgetState extends State<CustomLoadFooterWidget>
    with TickerProviderStateMixin<CustomLoadFooterWidget> {

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    print('loadState: ${widget.loadState}');

    return Stack(
      children: <Widget>[
        Positioned(
          child: Container(
            width:double.infinity,
            height: double.infinity,
            color: widget.customLoadFooter.bgColor,
            child: Center(
              child:  widget.isAdvance || (widget.noMore && widget.loadState == LoadMode.inactive)
                    ? SizedBox(width: 0,height: 0) 
                    : Padding(
                      padding: EdgeInsets.only(top: 14.w, bottom: 20.w),
                      child: Image.asset('assets/list-loading.gif', width: 160.w, height: 46.w),
                    ),
            )
            
          ),
        ),
      ],
    );
  }
}