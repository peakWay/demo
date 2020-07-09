
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';



class CustomButton extends StatelessWidget {
  CustomButton({
    Key key,
    this.text,
    this.decoration,
    this.style,
    this.borderRadius,
    this.padding = EdgeInsets.zero,
    this.child
  }) : assert(text == null || child == null),
       assert(text != null || child != null),
       super(key: key);

  ///圆角
  final BorderRadius borderRadius;

  ///Decoration 样式
  final BoxDecoration decoration;

  ///Padding模式
  final EdgeInsets padding;

  ///文本样式
  final TextStyle style;

  ///子控件
  final Widget child;

  ///文本内容
  final String text;

  BoxDecoration decorationResult(BuildContext context,double height) {
    print('$height, $borderRadius, ${Theme.of(context).primaryColor}');
    if (decoration == null) {
      return BoxDecoration(
        color: Theme.of(context).primaryColor,
        borderRadius: borderRadius,
      );
    } else {
      BoxDecoration newDecoration;
    
      newDecoration = decoration.copyWith(
        color: decoration.color ?? Theme.of(context).primaryColor,
        borderRadius: decoration.borderRadius ?? borderRadius
      );

      return newDecoration;
    }
  }
  
  @override
  Widget build(BuildContext context) {

    return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
        return DecoratedBox(
          decoration: decorationResult(context, constraints.minHeight),
          child: Padding(
            padding: padding,
            child: child ?? Center(
              widthFactor: 1, 
              heightFactor: 1,
              child: DefaultTextStyle(
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 28.w,
                ), 
                child: Text('$text', style: style)
              )
            ),
          )
        );
      },
    );
  }
}

class SizeButton extends CustomButton {
  SizeButton({
    Key key,
    @required this.width,
    @required this.height,
    BorderRadius borderRadius,
    BoxDecoration decoration,
    TextStyle style,
    String text,
    Widget child
  }) : super(key: key, borderRadius: borderRadius ?? BorderRadius.circular(height / 2), decoration: decoration, style: style, text: text, child: child);

  final double width;
  final double height;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: width,
      height: height,
      child: super.build(context)
    );
  }
}

class PaddingButton extends CustomButton {
  PaddingButton({
    Key key,
    @required this.padding,
    BorderRadius borderRadius,
    BoxDecoration decoration,
    TextStyle style,
    String text,
    Widget child
  }) : super(key: key, borderRadius: borderRadius, decoration: decoration, style: style, text: text, child: child);

  final EdgeInsets padding;

  Widget build(BuildContext context) {
    return super.build(context);
  }
}

class SizeButton1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 300.w,
      height: 60.w,
      decoration: BoxDecoration(
        color: Colors.pink,
        borderRadius: BorderRadius.circular(30.w),
        border: Border.all()
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Text(
          '确认',
          style: TextStyle(
            color: Colors.white,
            fontSize: 28.sp
          )
          ),
          Icon(Icons.ac_unit)
        ]
      )
    );

    Container(
      width: 300.w,
      height: 60.w,
      decoration: BoxDecoration(
        color: Colors.pink,
        borderRadius: BorderRadius.circular(30.w),
        border: Border.all()
      ),
      child: Center(
        child: Text(
            '确认',
            style: TextStyle(
              color: Colors.white,
              fontSize: 28.sp
            )
        )
      ),
    );
  }
}

class SizeButton2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 300.w,
      height: 60.w,
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: Colors.pink,
          borderRadius: BorderRadius.circular(30.w),
          border: Border.all()
        ),
        child: Center(
          child: Text(
          '确认',
          style: TextStyle(
            color: Colors.white,
            fontSize: 28.sp
          ),
        ),
        ),
      ),
    );
  }
}

class SizeButton3 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 20.w, vertical: 10.w),
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: Colors.pink,
          borderRadius: BorderRadius.circular(30.w),
          border: Border.all()
        ),
        child: Center(
          child: Text(
          '确认',
          style: TextStyle(
            color: Colors.white,
            fontSize: 28.sp
          ),
        ),
        ),
      ),
    );
  }
}

class SizeButton4 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return 
    // ClipRRect(
    //   borderRadius: BorderRadius.circular(20.w),
    //   child: ColoredBox(
    //     color: Colors.pink,
    //     child: Padding(
    //       padding: EdgeInsets.symmetric(horizontal: 20.w, vertical: 10.w),
    //       child: Text(
    //         '确认圣诞节佛酸豆角',
    //         style: TextStyle(
    //           color: Colors.white,
    //           fontSize: 28.sp
    //         ),
    //       ),
    //     ),
    //   ),
    // );

    DecoratedBox(
      decoration: BoxDecoration(
        color: Colors.pink,
        borderRadius: BorderRadius.circular(30.w),
        border: Border.all()
      ),
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: 20.w, vertical: 10.w),
        child: Center(child: Text(
          '确认圣诞节佛酸豆角',
          style: TextStyle(
            color: Colors.white,
            fontSize: 28.sp
          ),
        ),widthFactor: 1, heightFactor: 1,)
        

        // Text.rich(
        //         TextSpan(
        //             text: '确认圣诞节佛酸豆角',
        //             children: [TextSpan(text: '折', style: TextStyle(fontSize: 13))],
        //             style: TextStyle(fontSize: 24)),
        //       )
      ),
    );
    
    // return Container(
    //   padding: EdgeInsets.symmetric(horizontal: 20.w, vertical: 10.w),
      // decoration: BoxDecoration(
      //   color: Colors.pink,
      //   borderRadius: BorderRadius.circular(30.w),
      //   border: Border.all()
      // ),
      // child: Center(
      //   child: Text(
      //   '确认',
      //   style: TextStyle(
      //     color: Colors.white,
      //     fontSize: 28.sp
      //   ),
      // ),
      // ),
    // );
  }
}

// class PaddingButton extends AnimatedWidget {
//   PaddingButton(): super(listenable: );
// }



