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