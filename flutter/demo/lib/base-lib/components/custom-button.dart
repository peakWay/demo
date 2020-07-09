
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class CustomButton extends StatelessWidget {
  CustomButton({
    Key key,
    this.fontSize,
    this.border,
    this.borderRadius,
    this.color,
    this.gradient,
    this.textColor,
    this.text,
    this.child,
    this.height
  }) : assert(text == null || child == null),
       assert(text != null || child != null),
       super(key: key);

  final double fontSize;

  final Border border;

  final BorderRadius borderRadius;

  ///按钮背景
  final Color color;

  ///背景渐变
  final Gradient gradient;

  ///文字颜色
  final Color textColor;

  ///子控件
  final Widget child;

  ///文本内容
  final String text;

  final double height;

  double get leadingHeight => (height - (fontSize)) / (fontSize);
  
  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
        decoration: BoxDecoration(
          color: color ?? Theme.of(context).primaryColor,
          borderRadius: borderRadius,
          border: border,
          gradient: gradient
        ),
        child: child ?? Text(
          '$text', 
          style: TextStyle(
            fontSize: fontSize,
            color: textColor,
          ),
          textAlign: TextAlign.center,
          strutStyle: 
            height != null 
            ? StrutStyle(
                height: 1.5,
                // leading: leadingHeight,
                forceStrutHeight: true
              ) 
            : null,
        )
    );
  }
}

class SizeButton extends CustomButton {
  SizeButton({
    Key key,
    @required this.width,
    @required this.height,
    double fontSize,
    Border border,
    BorderRadius borderRadius,
    Color color,
    Gradient gradient,
    Color textColor,
    String text,
    Widget child
  }) : super(key: key, fontSize: fontSize, border: border, borderRadius: borderRadius ?? BorderRadius.circular(height / 2), color: color, gradient: gradient, textColor: textColor, text: text, child: child, height: height);

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
        child: Text(
          '确认圣诞节佛酸豆角',
          style: TextStyle(
            color: Colors.white,
            fontSize: 28.sp
          ),
        ),

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



