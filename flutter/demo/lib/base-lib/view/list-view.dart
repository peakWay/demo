import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';


class MyList extends StatefulWidget {
  @override
  _MyListState createState() => _MyListState();
}

class _MyListState extends State<MyList> {

  ScrollController _controller = new ScrollController();
  List<Widget> children = List<Widget>.generate(4, (int index){ // 也是可变数组
    return Container(
      height: 200,
      
      decoration: BoxDecoration(
        color: Colors.yellow,
        border: Border.all()
      ),
      child: Text('index: ${index}'),
    );
  });

  bool isRequest = false;

  void _retrieveData() {
    if (isRequest) return;

    isRequest = true;
    Future.delayed(Duration(seconds: 2)).then((e) {
      setState(() {
        children.insertAll(children.length, List<Widget>.generate(10, (int index){ // 也是可变数组
          return Container(
            height: 200,
            
            decoration: BoxDecoration(
              color: Colors.yellow,
              border: Border.all()
            ),
            child: Text('index: ${index}'),
          );
        }));
        
      });
    });
  }
  
  @override
  void initState() {
    super.initState();

    _controller.addListener(() {
    });
  }
  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: GeneralListView(
        controller: _controller,
        children: children,
        requestMethod: _retrieveData
      ),
    );
  }
}

class GeneralListView extends StatefulWidget {

  GeneralListView({
    Key key,
    this.isDisabled = false,
    this.controller,
    this.requestMethod,
    this.children
  }) : super(key: key);

  ///控制器
  final ScrollController controller;

  ///是否禁用滚动
  final bool isDisabled;

  ///请求方法
  final Function requestMethod;

  ///子列表
  final List<Widget> children;

  @override
  _GeneralListViewState createState() => _GeneralListViewState();
}

class _GeneralListViewState extends State<GeneralListView> {

  double offset = 0;
  ScrollController _controller;

  ///是否正在下拉
  bool isPullUp = false;

  ///!isPullUp &&

  ///下拉临界
  
  //* 默认组件 */
  ///空白间隔
  double blankHeight = 20;

  ///loading组件可显示高度
  double get visibleHeight => 
  offset < -blankHeight ? -(offset + blankHeight) : 0;

  Widget get _defaultPullUpLoading {
    print('visibleHeight: $visibleHeight');
    return Container(
      // height: 20.w,
      height: visibleHeight,
      child: OverflowBox(
        // maxHeight: 20.w,
        maxHeight: visibleHeight,
        child: Container(
          width: 300.w,
          height: 100.w,
          color: Colors.lightBlue,
          child: Text('loading刷新中'),
        ),
      ),
    );
  }
  /* 默认组件 */
  

  @override
  void initState() {
    super.initState();

    // widget.children.insert(0, ConstrainedBox(
    //   constraints: BoxConstraints(maxHeight: 10.w),
    //   child: OverflowBox(
    //   maxHeight: 10.w,
    //   child: Container(
    //     width: 300.w,
    //     height: 100.w,
    //     color: Colors.lightBlue,
    //     child: Text('loading刷新中'),
    //   ),
    // )
    //   )
    // );

    _controller = widget.controller ?? new ScrollController();

    _controller.addListener(() {
      offset = _controller.offset;

      print('Offset: $offset, visibleHeight: $visibleHeight');

      if (offset < 0) {

        // if (!isPullUp) {
          
        // }
        // print(1111);
        // widget.children.insert(0, _defaultPullUpLoading(offset));
        // isPullUp = true;
        setState(() {
          
        });
      } 
      // else if(offset > -10 && widget.children.contains(_defaultPullUpLoading)){
      //   // widget.children.remove(_defaultPullUpLoading);
      //   // isPullUp = false;
      //   setState(() {
          
      //   });
      // }
    });
  }

  @override
  void dispose() {
    super.dispose();

    _controller.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      overflow: Overflow.visible,
      children: <Widget>[
        ListView.builder(
          physics: widget.isDisabled 
                  ? ScrollPhysics(parent: NeverScrollableScrollPhysics())
                  : BouncingScrollPhysics(),
          controller: _controller,
          itemCount: widget.children.length,
          itemBuilder: (BuildContext context, int index) {
            print('list: $index');
            // if (index == 0) {
            //   return _defaultPullUpLoading;
            // }
            if (index == widget.children.length - 1) {
              widget.requestMethod();
            }

            return widget.children[index];
          }
        ),
        Positioned(
          top: -120.w,
          left: 30.w,
          child: Container(
            height: 20.w,
            width: 300.w,
            child: OverflowBox(
            maxHeight: 20.w,
            // maxHeight: visibleHeight,
            child: Container(
              width: 300.w,
              height: 100.w,
              color: Colors.lightBlue,
              child: Text('loading刷新中'),
            ),
          ),
          )
        )
      ],
    );
  }
}