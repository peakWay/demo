
// import 'dart:async';

import 'dart:async';
import 'dart:collection';

import 'package:demo/base-lib/utils/toast.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
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

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
     
    
    return MaterialApp(
      title: 'Flutter Demo',
      home: Scaffold(
        appBar: AppBar(title: Text('demo')),
        body: 
//         Listener(
//     child: Container(
//         constraints: BoxConstraints.tight(Size(300.0, 150.0)),
//         color: Colors.yellow,
//         child: Center(
//           child: Listener(
//             onPointerDown: (e) => print('child'),
//             child: Container(
//           color: Colors.red,
//           width: 100,
//           height: 50,
//           child: Center(child: Text("Box A")),
//         ),
//           ),
//         ),
//     ),
//     //behavior: HitTestBehavior.opaque,
//     onPointerDown: (event) => print("down A")
// ),
Listener(
  child: AbsorbPointer(
    child: Listener(
      child: Container(
        color: Colors.red,
        width: 200.0,
        height: 100.0,
        child: Center(
          child: Listener(
          child: Container(
            color: Colors.grey,
            child: Text('点击'),
          ),
          onPointerDown: (event)=>print("孙子"),
        ),
        )
      ),
      onPointerDown: (event)=>print("in"),
    ),
  ),
  onPointerDown: (event)=>print("up"),
)

//         Stack(
//   children: <Widget>[
//     Listener(
//       child: ConstrainedBox(
//         constraints: BoxConstraints.tight(Size(300.0, 200.0)),
//         child: DecoratedBox(
//             decoration: BoxDecoration(color: Colors.blue, border: Border.all(width: 10, color: Colors.transparent))),
//       ),
//       onPointerDown: (event) => print("down0"),
//     ),
//     Listener(
//       child: ConstrainedBox(
//         constraints: BoxConstraints.tight(Size(150.0, 200.0)),
//         child: Center(child: Text("左上角200*100范围内非文本区域点击")),
//       ),
//       onPointerDown: (event) => print("down1"),
//       behavior: HitTestBehavior.opaque, //放开此行注释后可以"点透"
//     )
//   ],
// )

      )
    );
  }
}


void main() => runApp(MyApp());