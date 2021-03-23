
// import 'dart:async';


import 'dart:async';

import 'package:demo/base-lib/utils/duration.dart';
import 'package:flutter/material.dart';
// abstract class TimerState<T extends StatefulWidget> extends State<T> {

//   Timer timer;
//   int count = 10;

//   @override
//   void initState() {

//     timer = new Timer.periodic(Duration(seconds: 1), (Timer timer) {
//       count--;

//       print('$count');
      
//       setState(() {});

//       if (count == 0) {
//         timer.cancel();
//       }

//     });

//     print('多了一步');
//     super.initState();
//   }

//   @override
//   dispose() {

//     timer.cancel();
//     super.dispose();
//   }

  
//   Widget build(BuildContext context);
// }

// class Temp extends StatefulWidget {
//   @override
//   _TempState createState() => _TempState();
// }

// class _TempState extends TimerState<Temp> {
//   @override
//   Widget build(BuildContext context) {
//     return RaisedButton(
//       child: Text(super.count.toString()),
//       onPressed: () {
//         super.dispose();
//       },
//     );
//   }
// }

// class MyApp extends StatefulWidget {
//   @override
//   _MyAppState createState() => _MyAppState();
// }

// class _MyAppState extends State<MyApp> {

//   bool showTime = true;

//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       title: 'Flutter Demo',
//       home: Scaffold(
//         appBar: AppBar(title: Text('demo')),
//         body: FractionalTranslation(
//           translation: Offset(0.3, 0),
//           child: Container(
//             // constraints: BoxConstraints(
//             //   minWidth: .expanded()
//             // ),
//             // width: double.infinity,
//             // height: double.infinity,
//             padding: EdgeInsets.all(10),
//             margin: EdgeInsets.all(20),
//             decoration: BoxDecoration(
//               color: Colors.red,
//               border: Border.all(width: 5)
//             ),
//             child: Container(
//               color: Colors.yellow,
//               child: Text('怎么回事'),
//             ),
//           ),
//         )
        
//         // Center(
//         //   child: Column(
//         //     children: [
//         //       showTime ? Temp() : SizedBox(),
//         //       RaisedButton(
//         //         onPressed: () {
//         //           showTime = false;
//         //           setState(() {});
//         //         },
//         //         child: Text('删除Time组件'),
//         //       )
//         //     ],
//         //   )
//         // ),
//       )
//     );
//   }
// }

// void main() => runApp(MyApp());

import 'package:flutter/material.dart';
import 'base-lib/components/countdown/extend.dart';
import 'base-lib/core/eventbus.dart';



mixin OtherState<T extends StatefulWidget> on State<T> {
  void initState() {
    print('其他状态 initState');
    super.initState();
  }
}


class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> with SingleTickerProviderStateMixin, OtherState {
  
  AnimationController controller;
  Animation<Color> animation;
  int count = 0;
  Map map;
  String remainTime;

  // @override
  void initState() {

    super.initState();

    print('MyApp initState');

    RegExp exp = RegExp(r"^WS{1,2}:\/\/(\d{1,3})\.(\d{1,3})\.\d{1,3}\.\d{1,3}:56789");
    String str = "WS://56.60.02.1:56789";
    Iterable<RegExpMatch> matches = exp.allMatches(str);
    List<int> groupIndics = [1, 2]; 
    matches.forEach((element) { 
      // print('${element.group(1)}, ${element.group(2)}, ${element.group(0)}');
      element.groups(groupIndics).forEach((e) {
        // print(e);
      });
    });
    // print(exp.stringMatch(str));
    // DayTime s = DayTime.fromDuration(DateTime.now().difference(DateTime.fromMillisecondsSinceEpoch(1616340544000)));
    // s.format();
    // print(s.format('D天 HH:mm:ss'));
    

    controller = new AnimationController(
      duration: const Duration(seconds: 1),
      lowerBound: 10.0,
      upperBound: 100.0,
      vsync: this
    );

    animation = new ColorTween(begin: Colors.red, end: Colors.yellow).animate(controller);

    animation.addListener(() { 
      setState(() {
        ++count;
      });
    });

    print('${animation is Listenable}, 啥');

    controller.forward();
  }

  @override
  void dispose() {
    super.dispose();
    controller.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: Scaffold(
        appBar: AppBar(title: Text('demo')),
        body: NotificationListener<MyNotification>(
          onNotification: (notification) {
            print('${notification.msg}，爷爷');

            return false;
          },
          child: NotificationListener<MyNotification>(
            onNotification: (notification) {
              print('${notification.msg}，父亲');

              return true;
            },
            child: Column(
              children: [

                MyCountdown(161648928000)
              ],
            )
          ),
        )
      )
    );
  }
}

class MyCountdown extends CountdownWidget {
  MyCountdown(target) : super(target: target);

  @override
  void initOvertime() {
    
  }

  @override
  void timeout() {
    print('时间到了');
  }

  @override
  Widget build(BuildContext context, DayTime remain) {
    if (remain == null) return null;

    return Container(
      color: Colors.red,
      child: Text(remain.isZero ? '时间结束' : remain.format('D天 HH:mm:ss')),
    );
  }
}

class MyNotification extends Notification {
  MyNotification(this.msg);

  final String msg;
}

void main() => runApp(MyApp());

