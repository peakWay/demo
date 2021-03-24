


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
      routes: {
        '/': (context) => new HomePage()
      },
      onGenerateRoute: (RouteSettings settings) {

        if (settings.name == '/b') 
          return PageRouteWithActiveBuilder(
            transitionDuration: Duration(milliseconds: 500),
            transitionsBuilder: (BuildContext context, Animation<double> animation, Animation<double> secondaryAnimation, Widget child, bool isActive) {
              if (isActive) {
                Animation curveAnimation = CurvedAnimation(parent: animation, curve: Curves.ease);
                Animation slideAnimation = Tween<Offset>(begin: const Offset(1.0, 1.0), end:Offset(0.1, 0.0)).animate(curveAnimation);

                return new SlideTransition(
                  position: slideAnimation,
                  child: child
                );
              } else {
                // Padding(padding: EdgeInsets.zero);
                return FadeTransition(
                  opacity: animation,
                  child: child,
                );
              }
            },
            opaque: false,
            pageBuilder: (BuildContext context, Animation animation,
                Animation secondaryAnimation) {

                return new PageB(text: settings.arguments);
            },
          );
          
          // return PageRouteBuilder(
          //   transitionDuration: Duration(milliseconds: 500), //动画时间为500毫秒
          //   transitionsBuilder: (BuildContext context, Animation<double> animation, Animation<double> secondaryAnimation, Widget child) {

          //     Animation curveAnimation = CurvedAnimation(parent: animation, curve: Curves.ease);
          //     Animation slideAnimation = Tween<Offset>(begin: const Offset(1.0, 1.0), end:Offset(0.1, 0.0)).animate(curveAnimation);

          //     return new SlideTransition(
          //       position: slideAnimation,
          //       child: child
          //     );
          //   },
          //   // barrierColor: Colors.white,
          //   opaque: false,
          //   pageBuilder: (BuildContext context, Animation animation,
          //       Animation secondaryAnimation) {

          //         return new PageB(text: settings.arguments);
                  
          //     //注：如果设置了transitionsBuilder就不需要在这边设置了
          //     // Animation curveAnimation = CurvedAnimation(parent: animation, curve: Curves.ease);
          //     // Animation slideAnimation = Tween<Offset>(begin: const Offset(1.0, 1.0), end:Offset(0.1, 0.0)).animate(curveAnimation);

          //     // return new SlideTransition(
          //     //   position: slideAnimation,
          //     //   child: new PageB(text: settings.arguments)
          //     // );
          //   },
          // );
        else return null;
      },
    );
  }
}
class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {

    int count = 10;

    return Scaffold(
        appBar: AppBar(title: Text('demo')),
        body: Column(
          children: [
            Builder(builder: (BuildContext context) {
              return RaisedButton(
                child: Text('$count跳转页面'),
                  onPressed: () {
                    Navigator.pushNamed(context, '/b', arguments: '页面B');
            });
              },
            )
          ],
        )
      );
  }
}

class PageB extends StatefulWidget {
  PageB({this.text});

  final String text;
  @override
  _PageBState createState() => _PageBState();
}

class _PageBState extends State<PageB> {
  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.yellow,
      child: Center(
        child: RaisedButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: Text(widget.text),
        ),
      ),
    );
  }
}

Widget _defaultActiveTransitionsBuilder(BuildContext context, Animation<double> animation, Animation<double> secondaryAnimation, Widget child, bool isActive) {
  return child;
}

typedef RouteTransitionsWithActiveBuilder = Widget Function(BuildContext context, Animation<double> animation, Animation<double> secondaryAnimation, Widget child, bool isActive);
class PageRouteWithActiveBuilder<T> extends PageRoute<T> {
  /// Creates a route that delegates to builder callbacks.
  ///
  /// The [pageBuilder], [transitionsBuilder], [opaque], [barrierDismissible],
  /// [maintainState], and [fullscreenDialog] arguments must not be null.
  PageRouteWithActiveBuilder({
    RouteSettings settings,
    @required this.pageBuilder,
    this.transitionsBuilder = _defaultActiveTransitionsBuilder,
    this.transitionDuration = const Duration(milliseconds: 300),
    this.reverseTransitionDuration = const Duration(milliseconds: 300),
    this.opaque = true,
    this.barrierDismissible = false,
    this.barrierColor,
    this.barrierLabel,
    this.maintainState = true,
    bool fullscreenDialog = false,
  }) : assert(pageBuilder != null),
       assert(transitionsBuilder != null),
       assert(opaque != null),
       assert(barrierDismissible != null),
       assert(maintainState != null),
       assert(fullscreenDialog != null),
       super(settings: settings, fullscreenDialog: fullscreenDialog);

  /// {@template flutter.widgets.pageRouteBuilder.pageBuilder}
  /// Used build the route's primary contents.
  ///
  /// See [ModalRoute.buildPage] for complete definition of the parameters.
  /// {@endtemplate}
  final RoutePageBuilder pageBuilder;

  /// {@template flutter.widgets.pageRouteBuilder.transitionsBuilder}
  /// Used to build the route's transitions.
  ///
  /// See [ModalRoute.buildTransitions] for complete definition of the parameters.
  /// {@endtemplate}
  final RouteTransitionsWithActiveBuilder transitionsBuilder;

  @override
  final Duration transitionDuration;

  @override
  final Duration reverseTransitionDuration;

  @override
  final bool opaque;

  @override
  final bool barrierDismissible;

  @override
  final Color barrierColor;

  @override
  final String barrierLabel;

  @override
  final bool maintainState;

  @override
  Widget buildPage(BuildContext context, Animation<double> animation, Animation<double> secondaryAnimation) {
    return pageBuilder(context, animation, secondaryAnimation);
  }

  @override
  Widget buildTransitions(BuildContext context, Animation<double> animation, Animation<double> secondaryAnimation, Widget child) {

    //isActive等于true为打开新路由动画，isActive等于false为关闭当前路由
    return transitionsBuilder(context, animation, secondaryAnimation, child, isActive);
  }
}

void main() => runApp(MyApp());

