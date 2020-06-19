
/**
 * 常用相关css与decoration的demo,view
 * 有以下类:
 * Wrap
 */

import 'package:flutter/material.dart';


class MyDecoration extends StatelessWidget {
  
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        width: 200.0,
        height: 200.0,
        color: Colors.yellow,
        child: _Wrap()
      ),
    );
  }
}

class _Wrap extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Wrap(
      alignment: WrapAlignment.spaceEvenly,
      crossAxisAlignment: WrapCrossAlignment.center,
      runAlignment: WrapAlignment.center,
      // direction: Axis.vertical,
      // spacing: 20,  //主轴方向上的间距
      runSpacing: 10,  //纵轴方向元素的间距
      textDirection: TextDirection.rtl,
      children: <Widget>[
        Container(
          width: 80.0,
          height: 40.0,
          color: Colors.pink
        ),
        Container(
          width: 80.0,
          height: 40.0,
          color: Colors.lightBlue
        ),
        Container(
          width: 80.0,
          height: 40.0,
          color: Colors.lightGreen
        ),
        Container(
          width: 80.0,
          height: 60.0,
          color: Colors.brown
        )
      ],
    );
  }
}

/* 动画相关 */
// class MyAnimationWidget extends AnimatedWidget {
//     MyAnimationWidget({Key key, Animation<double> animation})
//       : super (key: key, listenable: animation);


//     Widget build(BuildContext context) {
//       final Animation<double> animation = listenable;
//       return Container(
//         width: animation.value,
//         height: animation.value,
//         color: Colors.yellow
//       );
//     }
// }

class MyWidget extends StatefulWidget {
  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> with SingleTickerProviderStateMixin{

  AnimationController animate;
  Animation<double> signAnimation;
  Animation<Color> colorAnimation;
  TweenSequence tween; //组合tween
  @override
  void initState() {
    super.initState();
    
    animate = AnimationController(duration: Duration(seconds: 2), vsync: this)
        ..addListener(() {
          setState(() {
            // the state that has changed here is the animation object’s value
          });
        });

    // tween = TweenSequence([
    //   TweenSequenceItem(tween: Tween(begin: 100.0, end: 200.0).chain(CurveTween(curve: Curves.bounceIn)),weight: 50),
    //   TweenSequenceItem(tween: Tween(begin: 200.0, end: 300.0),weight: 50)
    // ]);
    
    signAnimation = Tween(begin: 100.0, end: 300.0).animate(CurvedAnimation(parent: animate, curve: Curves.ease));
    colorAnimation = ColorTween(begin: Colors.yellow, end: Colors.red).animate(animate);
    // signAnimation = tween.animate(animate);

    // animate = new AnimationController(
    //     duration: const Duration(milliseconds: 2000), vsync: this);
    // signAnimation = new Tween(begin: 0.0, end: 300.0).animate(animate)
    //   ..addListener(() {
    //     setState(() {
    //       // the state that has changed here is the animation object’s value
    //     });
    //   });
    animate.forward();
  }

  @override
  Widget build(BuildContext context) {
    
     return Container(
        width: signAnimation.value,
        height: signAnimation.value,
        color: colorAnimation.value
    );
  }
}
/* 动画相关 */