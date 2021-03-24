

/**
 * 本页代码主要实现了AnimatedWidget，和AnimatedBuilder的运用和原理
 * 也发现了builder + child实现单次构建的方法
 */

import 'package:flutter/material.dart';
class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> with SingleTickerProviderStateMixin {
  
  AnimationController controller;
  Animation<Color> animation;
  int count = 0;

  // @override
  void initState() {

    super.initState();

    controller = new AnimationController(
      duration: const Duration(seconds: 1),
      lowerBound: 10.0,
      upperBound: 100.0,
      vsync: this
    );

    // animation = new ColorTween(begin: Colors.red, end: Colors.yellow).animate(controller);

    controller.addListener(() { 
      setState(() {
        ++count;
      });
    });

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
        body: Column(
              children: [
                // MyAnimatedBuilder(
                //   animation: controller,
                //   builder: (context) {
                //     print('我的里面');
                //     return Container(
                //       width: controller.value,
                //       height: controller.value,
                //       child: MyDom()
                //     );
                //   }
                // ),
                // MyGrowTransition(
                //   animation: controller,
                //   child: MyDom(),
                // ),
                // GrowTransition(
                //   animation: controller,
                //   child: Dom()
                // )

                // AnimatedBuilder(
                //   animation: controller, 
                //   child: Dom(),
                //   builder: (context, child) {
                //     print('里面');
                //     return Container(
                //       width: controller.value,
                //       height: controller.value,
                //       child: child,
                //     );
                //   }
                // ),
                Container(
                  width: controller.value,
                  height: controller.value,
                  child: MyDom(),
                )
              ],
            )
        )
      );
  }
}

class MyDom extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    print('MyDom 重新构建了');
    return Image.network('https://oss.pocketuniversity.cn/media/2019-09-19/5d82dea62ca69.JPG');
  }
}
class Dom extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    print('重新构建了');
    return Image.network('https://oss.pocketuniversity.cn/media/2019-09-19/5d82dea62ca69.JPG');
  }
}
class GrowTransition extends StatelessWidget {
  GrowTransition({this.child, this.animation});

  final Widget child;
  final Animation<double> animation;
    
  Widget build(BuildContext context) {
    return new Center(
      child: new AnimatedBuilder(
          animation: animation,
          builder: (BuildContext context, Widget child) {
            return new Container(
                height: animation.value, 
                width: animation.value, 
                child: child
            );
          },
          child: child
      ),
    );
  }
}

class MyGrowTransition extends StatelessWidget {
  MyGrowTransition({this.child, this.animation});

  final Widget child;
  final Animation<double> animation;

  Widget build(BuildContext context) {
    return MyAnimatedBuilder(
      animation: animation,
      builder: (BuildContext context) {
        return Container(
          width: animation.value,
          height: animation.value,
          child: child,
        );
      }
    );
  }
}

class MyAnimatedBuilder extends AnimatedWidget {
  MyAnimatedBuilder({
    animation,
    child,
    @required this.builder
  }) : assert(builder != null),
      super(listenable: animation);

  final Widget Function(BuildContext context) builder;

  Widget build(BuildContext context) => builder(context);
}


void main() => runApp(MyApp());

