
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ChatMessageTriangle extends StatelessWidget {
  ChatMessageTriangle({
    this.direction,
    this.color,
    this.child
  });

  final Widget child;

  final String direction; // left, right

  final Color color;

  @override
  Widget build(BuildContext context) {
    return Stack(
      overflow: Overflow.visible,
      children: <Widget>[
        child,
        Positioned(
          right: direction == 'right' ? -12.w : null,
          left: direction == 'left' ? -12.w : null,
          top: 28.w,
          child: ClipPath(
            clipper: Triangle(direction: direction),
              child: Container(
              width: 16.w,
              height: 21.w,
              color: color
            ),
          )
        )
      ],
    );
  }
}


class Triangle extends CustomClipper<Path> {

  Triangle({
    this.direction
  });

  final String direction;
  
  @override
  Path getClip(Size size) {
    var path = Path();
    double w = size.width;
    double h = size.height;

    if (direction == 'left') {
      path.moveTo(w, h);

      path.quadraticBezierTo(0, h / 2, 0, 0);
      path.quadraticBezierTo(w / 3, h / 3, w, h / 4);
      path.quadraticBezierTo(w * 3 / 4, h / 2 , w, h);
    } else if (direction == 'right') {
      path.moveTo(0, h);
      path.quadraticBezierTo( w , h / 2, w, 0);
      path.quadraticBezierTo( w / 3 , h / 3, 0, h * 3/10 );
      path.quadraticBezierTo( w / 3 , h / 2, 0, h);
    }

    
    return path;
  }
 
  @override
  bool shouldReclip(CustomClipper<Path> oldClipper) => false;
}