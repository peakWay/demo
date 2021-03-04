import 'package:demo/base-lib/utils/toast.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:oktoast/oktoast.dart';
class WillPop extends StatefulWidget {
  @override
  _WillPopState createState() => _WillPopState();
}

class _WillPopState extends State<WillPop> {
  DateTime _lastPressedAt; //上次点击时间

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return new WillPopScope(
        onWillPop: () async {
          print('$_lastPressedAt, _lastPressedAt');
          if (_lastPressedAt == null) {
            //两次点击间隔超过1秒则重新计时
            _lastPressedAt = DateTime.now();

            print('咋回事');
            
            Toast.show('再次返回即退出', onDismiss: () {
              print('弹窗消失了');
              _lastPressedAt = null;
            });

            return false;
          } else if (_lastPressedAt != null && DateTime.now().difference(_lastPressedAt) > Duration(seconds: 1)) {
            _lastPressedAt = DateTime.now();
            
            return false;
          }

          return true;
        },
        child: Center(
          child: Text('sf')
        )
      );
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: Size(750, 1334),
      allowFontScaling: false,
      builder: () => OKToast(
        child: MaterialApp(
          debugShowCheckedModeBanner: false,
          title: 'Flutter_ScreenUtil',
          home: Scaffold(
            appBar: AppBar(title: Text('demo')),
            body: WillPop() 
          ),
        )
      )
    );
  }
}


void main() => runApp(MyApp());

