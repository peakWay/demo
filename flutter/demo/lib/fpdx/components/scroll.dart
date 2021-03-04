
import 'package:demo/fpdx/constants/style.dart';
import 'package:demo/pub-components/easy-refresh.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {

    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
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

    Widget _buildEmptyWidget() {
      return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Padding(
            padding: EdgeInsets.only(right: 18.w),
            child: Image.network('https://oss.pocketuniversity.cn/media/2020-08-19/5f3cc80563ac9.png', width: 176.w, height: 168.w),
          ),
          Padding(
            padding: EdgeInsets.only(top: 20.w, bottom: 100.w),
            child: Text('暂时还没有动态哦~', style: TextStyle(fontSize: 25.sp, color: MyColors.textMinor)),
          )
        ],
      );
    }

    int age = 16;

    List<Color> colorList = [
      Colors.red,
      Colors.yellow,
      Colors.blue,
      Colors.green
    ];

    Future<List<AgeModel>> onLoad() async {
      age = age + 1;

      List<AgeModel> list;
      await Future.delayed(Duration(seconds: 2), () {
        list = List.generate(10, (index) {
          return AgeModel(age: age, color: colorList[age % 4]);
        });
      });

      return list;
    }

    Future<List<AgeModel>> onRefresh() async {
      age = 16;
      List<AgeModel> list;
      list = List.generate(10, (index) {
          return AgeModel(age: age, color: colorList[age % 4]);
      });


      return list;
    }

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

        SizedBox(
          height: 60,
        ),

        Expanded(
          // child: _Example()
          child: CommunityList(
            emptyWidget: _buildEmptyWidget(),
            onLoad: onLoad,
            onRefresh: onRefresh,
          ),
        )
      ],
    );
  }
}

class AgeModel {
  AgeModel({
    this.age,
    this.color
  });

  final int age;
  final Color color;

}

typedef loadFunc = Future<List<AgeModel>> Function();

class CommunityList extends StatefulWidget {
  CommunityList({
    Key key,
    this.emptyWidget,
    this.firstRefreshWidget,
    this.onLoad,
    this.onRefresh,
  }) : super(
    key: key,
  );

  Widget emptyWidget;
  Widget firstRefreshWidget;
  loadFunc onLoad;
  loadFunc onRefresh;

  @override
  _CommunityListState createState() => _CommunityListState();
}


class _CommunityListState extends GeneralListViewState<CommunityList> {

  int _count = 20;

  List<Widget> children = [];

  List<Map> ageList = [];

  static double progressLength = 440.w;
  static double progressHeight = 20.w;

  GlobalKey myDynamicPageKey = GlobalKey();

  @override
  void initState() {
    super.initState();

    if (_count == 0) emptyWidget = widget.emptyWidget;
    firstRefreshWidget = widget.firstRefreshWidget;

    onRefresh();

    WidgetsBinding.instance.addPostFrameCallback((mag) {
      
       print("  页面渲染完毕"); 
       print('${myDynamicPageKey.currentContext.size.height}, height');
    });

  }

  void onScroll() {

    setState(() {
      
    });
  }

  @override
  Future onLoad() async{
    List<AgeModel> datas = await widget.onLoad();

    print(' onLoad-datas');

    // List<Widget> appendChildren = datas.map((item) => Container(
    //       width: double.infinity,
    //       height: 100,
    //       child: Center(
    //         child: Text('${item.age}'),
    //       ),
    //       decoration: BoxDecoration(
    //         border: Border.all(),
    //         color: item.color,
    //       ),
          
    //     )
    //   ).toList();


    // children.addAll(appendChildren);

    filterData(datas);

    if (children.length > 100) setNoMore();

    setState(() {
      
    });
  }

  @override
  Future onRefresh() async{
    List<AgeModel> datas = await widget.onRefresh();

    print('onRefresh-datas');

    //清空List
    ageList = [];
    children = [];

    filterData(datas);

    setState(() {});
  }

  void filterData(List<AgeModel> list) {
    if (list.isEmpty) return;

    list.forEach((item) { 
      children.add(
        Container(
          width: double.infinity,
          height: 100,
          child: Center(
            child: Text('${item.age}'),
          ),
          decoration: BoxDecoration(
            border: Border.all(),
            color: item.color,
          ),
        )
      );

      addAgeMap(item);
    });

    print('${ageList}');
  }

  void addAgeMap(AgeModel item) {

    int index = ageList.indexWhere((value) => item.age == value['age']);

    if (index == -1) {
      ageList.add({
        'age': item.age,
        'count': 1
      });
    } else {
      ageList[index]['count'] = ageList[index]['count'] + 1;
    }
  }

  @override
  Widget builder() {
    return Column(
      key: myDynamicPageKey,
      children: children,
    );
  }

  Widget _buildSingleAgeProgress(width, innerWidth) {
    return Stack(
      children: <Widget>[
        SizedBox(
          width: width,
          height: 20.w,
          child: Align(
            alignment: Alignment.centerLeft,
            child: Container(
              width: innerWidth,
              height: 20.w,
              decoration: BoxDecoration(
                // borderRadius: BorderRadius.circular(10.w),
                color: MyColors.primary
              ),
            ),
          )
        ),
        Positioned(
          child: Container(
            width: 20.w,
            height: 20.w,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10.w),
              color: Colors.green,
            )
          ),
        )
      ],
    );
  }

  Widget _buildProgress () {
    print('$offset, $contentHeight, _buildProgress');

    
    double rate = offset == null || contentHeight == null || contentHeight == 0.0  ?  0 : offset / contentHeight;

      // ( == null ? 0 : 0) /  (contentHeight == null ||  == 0.0 ? 1 : contentHeight)
    print('$rate,');
      
    if (ageList.length == 1) {
      return Positioned(
        left: 0,
        top: 0,
        child: _buildSingleAgeProgress(progressLength, progressLength * rate),
      );
    } else if (ageList.length == 2) {
      double countRate = ageList[0]['count'] / children.length;
      return Positioned(
        child: Row(
          children: <Widget>[
            _buildSingleAgeProgress(progressLength / 2, (progressLength / 2) * (rate > countRate ? 1 : rate) ),
            _buildSingleAgeProgress(progressLength / 2, (progressLength / 2) * (rate > countRate ? rate - countRate : 0)),
          ],
        ),
      );
    } else {
      return Positioned(
        top: 0,
        left: -40,
        child: Row(
          children: ageList.map((e) => _buildSingleAgeProgress(progressLength / 2, progressLength / 2)).toList(),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      overflow: Overflow.visible,
      children: <Widget>[
        super.build(context),
        Positioned(
          top: -60,
          left: 0,
          child: Container(
            color: Colors.white,
            height: 60,
            width: MediaQuery.of(context).size.width,
            child: Center(
              child: Container(
                width: progressLength,
                height: 40.w,
                decoration: BoxDecoration(
                  color: Color(0xFFF6F7FB),
                  borderRadius: BorderRadius.circular(20.w)
                ),
                child: Stack(
                  children: <Widget>[
                    _buildProgress()
                    
                  ],
                ),
                // child: ClipRRect(
                //   clipper: AgeProgressClipper(),
                //   child: _buildProgress(),
                // )
              ),
            )
          ),
        )
      ],
    );
  }

  ///点赞功能
}

// class AgeProgressClipper extends CustomClipper<RRect> {

//   @override
//   RRect getClip(Size size) {
//     return RRect.fromRectAndRadius(Rect.fromLTWH(0, 0, 440.w, 20.w), Radius.circular(10.w));
//   }

//   @override
//   bool shouldReclip(CustomClipper<RRect> oldClipper) => false;

// }