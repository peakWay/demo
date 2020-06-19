
import 'package:flutter/material.dart';
import 'package:demo/fpdx/uikit/action_sheet/action_sheet.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:demo/fpdx/uikit/tabbar/tabbar.dart';

class MyWidget extends StatefulWidget {
  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> with SingleTickerProviderStateMixin{
  
  
  TabController _tabController;
  Widget tabbarAreaWidget;
  List<Tab> tabs;
  List<String> tabbarLockList;

  @override
  void initState() {
    super.initState();

    tabs = <Tab>[
      Tab(text: 'CP关系'),
      Tab(text: '初见')
    ];
    tabbarLockList = ['相识', '相知'];

    

    _tabController = TabController(initialIndex: 0, length: tabs.length, vsync: this)
      ..addListener(() {
            print('${_tabController.index}');
        });
    
  }

  //获取锁住的tabWidget
  Widget _getTabLockWidget(String text) {//是否锁住, 是否当前选中
    return Flexible(
      child: FractionallySizedBox(
        widthFactor: 1,
        child: GestureDetector(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Icon(Icons.lock, size: 10, color: Color(0xFFCCCCCC)),
              Text('$text', style: TextStyle(color: Color(0xFFCCCCCC), fontSize: 26.w))
            ],
          ),
          onTap: () {
            //TODO: Toast
            print('暂未解锁');
          }
        )
      )
    );
     
  }

  //获取tabbar区域Widget
  Widget _buildTabbarAreaWidget() {
    Widget result;

    Widget tabbar = XTabBar(
      controller: _tabController, 
      tabs: tabs, 
      isScrollable: false, 
      labelStyle: TextStyle(fontSize: 13, color: Color(0xFFFF7E98), fontWeight: FontWeight.normal), 
      unselectedLabelStyle: TextStyle(fontSize: 13, color: Color(0xFF333333)), 
      indicatorWeight: 6.w, 
      indicatorWidth: 14.w
    );

    if (tabbarLockList != null && tabbarLockList.length > 0) {

      List<Widget> lockWidget = [];

      for (var value in tabbarLockList) {
        lockWidget.add(_getTabLockWidget(value));
      }

      result = Row(
        children: <Widget>[
          Container(
            width: MediaQuery.of(context).size.width / 4 * tabs.length,
            child: tabbar,
          ),
          ...lockWidget
        ]
      );
    } else {
      result = tabbar;
    }
    
    tabbarAreaWidget = result;

    return tabbarAreaWidget;
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {

    return Container(
      width: MediaQuery.of(context).size.width,
      height: 200.0,
      color: Colors.white,
      child: Column(
        children: <Widget>[
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: tabs.map((item) {
                return MatchStoryContent(
                  task: TaskModel(title: '双方合作，来一张合拍图', day: 1, detail: 'http://baidu.com'),
                  myFinishState: TaskFinishStateModel(sex: 1, state: 1, image: 'https://oss.pocketuniversity.cn/media/2019-09-19/5d82dea62ca69.JPG', avatar: 'https://oss.pocketuniversity.cn/media/2019-09-19/5d82dea62ca69.JPG'),
                  otherFinishState: TaskFinishStateModel(sex: 2, state: 1, image: 'https://oss.pocketuniversity.cn/media/2019-09-19/5d82dea62ca69.JPG', avatar: 'https://oss.pocketuniversity.cn/media/2019-09-19/5d82dea62ca69.JPG')
                );
              }).toList()
            )
          ),
          
          Container(
            width: MediaQuery.of(context).size.width,
            height: 84.w,
            padding: EdgeInsets.fromLTRB(0, 10.w, 0, 18.w),
            decoration: BoxDecoration(
              border: Border(top: BorderSide(width: 1.w, style: BorderStyle.solid, color: Color(0xFFDDDDDD))),
              color: Colors.white
            ),
            child: tabbarAreaWidget ?? _buildTabbarAreaWidget()
          ),
          // , indicatorColor: Color(0xFFFF7E98), indicatorWeight: 14.0.w
        ],
        
      )
    );
  }
}

//任务格式
class TaskModel {
  TaskModel({
    this.title, 
    this.day,
    this.note,
    this.detail
  });

  final String title;  //标题
  final int day;  //第几天
  final String note;  //备注
  final String detail;  //详情链接
}

class TaskFinishStateModel {
  TaskFinishStateModel({
    this.state = 0,
    this.image,
    this.sex = 1,
    this.avatar = 'https://oss.pocketuniversity.cn/media/2019-09-19/5d82dea62ca69.JPG'
  });

  final int state;
  final String image;
  final int sex;
  final String avatar;
}


//tabbar主体显示部分
class MatchStoryContent extends StatelessWidget {
  MatchStoryContent({
    Key key, 
    this.task, 
    this.myFinishState,
    this.otherFinishState
  }) : super(key: key);

  final TaskModel task; //当前任务
  final TaskFinishStateModel myFinishState;  //我的完成状态
  final TaskFinishStateModel otherFinishState;  //对方的完成状态

  static double imageRadius = 35.0.w;

  //获取我未上传部件
  Widget _getMyImageNoUploadWidget(size) {
    return GestureDetector(
      child: Container(
        width: size,
        height: size,
        margin: EdgeInsets.symmetric(horizontal: 42.0.w),
        decoration: BoxDecoration(
          color: Color(0xFFF9F9FB),
          borderRadius: BorderRadius.circular(imageRadius)
        ),
        child: Icon(Icons.ac_unit)
      ),
      onTap: () {
        //TODO: 上传照片
      }
    );
  }

  //获取有上传照片的部件
  Widget _getHasUploadWidget(TaskFinishStateModel data, double size) {
    return Container(
      width: size,
      height: size,
      margin: EdgeInsets.symmetric(horizontal: 42.0.w),
      decoration: BoxDecoration(
        image: DecorationImage(image: NetworkImage(data.image)),
        borderRadius: BorderRadius.circular(imageRadius)
      ),
      child: Stack(
        children: <Widget>[
          Positioned(
            right: 10.0.w,
            bottom: 10.0.w,
            child: Container(
              width: 52.0.w,
              height: 52.0.w,
              decoration: BoxDecoration(//TODO: 是否有颜色主体色
                border: Border.all(color: data.sex == 2 ? Color(0xFFFF7E98) : Color(0xFF7BD4F8), width: 3.w, style: BorderStyle.solid),
                image: DecorationImage(
                  image: NetworkImage(data.avatar)
                ),
                shape: BoxShape.circle
              ),
            )
          )
        ],
      ),
    );
  }

  //显示照片操作栏
  void showImageActionSheet(BuildContext context) {
    ActionSheet.show(context, 
      actions: [
        ActionSheetAction(
          type: ActionSheetActionType.Text,
          text: "预览",
          onTap: () {
            //TODO: 预览
          },
        ),
        ActionSheetAction(
          type: ActionSheetActionType.Text,
          text: "替换",
          onTap: () {
            //TODO: 替换
          },
        )
      ]
    );
  }

  //判断图片区域部件
  List<Widget> _getImageAreaWidgets(BuildContext context) {
    List<Widget> imageAreaWidges = [];

    double size;
    Widget myImageWidge;

    size = otherFinishState == null || otherFinishState.state == 0 ?  150.0.w : 130.0.w;

    //对方已上传
    if (otherFinishState != null && otherFinishState.state == 1) {  
      imageAreaWidges.add(_getHasUploadWidget(otherFinishState, size));
    }

    myImageWidge = (myFinishState != null && myFinishState.state == 1) 
      ? GestureDetector(
        child: _getHasUploadWidget(myFinishState, size),
        onTap: () {
          showImageActionSheet(context);
        }
      ) 
      : _getMyImageNoUploadWidget(size);

    imageAreaWidges.add(myImageWidge);

    return imageAreaWidges;
  }

  @override
  Widget build(BuildContext context) {
    
    return Column(
      children: <Widget>[
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('Day${task.day}: ${task.title}', style: TextStyle(fontSize: 28.0.sp,color: Color(0xFFFF7E98))),
            GestureDetector(
              child: Text('（任务详情）', style: TextStyle(fontSize: 28.0.sp, color: Color(0xFF5094FF))),
              onTap: () {
                print('跳转');
              },
            )
          ]
        ),
        Padding(
          padding: EdgeInsets.only(top: 26.0.w),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: _getImageAreaWidgets(context)
          )
        )
      ],
    );
  }
}