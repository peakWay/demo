
import 'package:flutter/material.dart';

class MyClipPath extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ClipPath(
        clipper: MyClipper(),
        child: Image.network('https://oss.pocketuniversity.cn/media/2019-09-19/5d82dea62ca69.JPG', width: 200, height: 200)
      );
  }
}

class MyClipper extends CustomClipper<Path> {
  MyClipper();

  @override
  getClip(Size size) {
    Path path = Path();

    double width = size.width;
    double height = size.height;

    //圆
    /// temp.addOval(Rect.fromLTWH(0, 0, size.width / 2, size.height / 2));
    
    //弧线
    // path.addArc(Rect.fromLTWH(0, 0, size.width, size.height), 0 , math.pi * 2);

    //基于已有路径变化
    // Path temp = Path();
    // path.addPath(temp, Offset(size.width / 3, size.height / 3));

    //多边形
    // path.addPolygon([
    //   Offset(0,  height / 3),
    //   Offset(width,  height / 3),
    //   Offset(0,  height),
    //   Offset(width / 2,  0),
    //   Offset(width,  height),
    // ], true);

    //矩形
    // path.addRect(Rect.fromLTWH(0, 0, size.width / 2, size.height / 2));

    //圆角矩形
    // path.addRRect(RRect.fromRectAndRadius(Rect.fromLTWH(0, 0, size.width / 2, size.height / 2), Radius.circular(20)));

    //路径
    // arcTo;arcToPoint;conicTo;cubicTo;
    /// 特殊介绍：贝塞尔曲线: conicTo(一控点，两定点，一权重);cubicTo(两控点，两定点);quadraticBezierTo(一控点，两定点，权重为1)
    /// 两定点(一当前点，一指定点)
    /// path.moveTo(0, height / 2);
    /// path.conicTo(width / 4, height/ 4, width, height / 2, 2);
    /// path.moveTo(0, width / 2);
    /// path.cubicTo(width / 2, -height, width / 2, height * 2, width, height/ 2);
    /// 路径方法大都前面可以加relative，如relativearcToPoint, 但好像会直接连接前后两点
    
    // path.arcTo(Rect.fromLTWH(0, 0, size.width / 2, size.height / 2), 0, math.pi / 2, true);
    // path.arcToPoint(Offset(width / 4, height), radius: Radius.circular(20), rotation: 40, clockwise: false);
    // path.conicTo(width, height, width / 5 * 4, height /5 * 4, 0.5);
    // path.cubicTo(width * 1.2, height / 2, width / 3 * 2, height / 12 * 5, width, height / 3);
    // path.lineTo(width / 4 * 3, 0);

    //获取边界信息，贝塞尔控制点也算
    //print('${path.getBounds()}'); 
    // path.quadraticBezierTo(width, height, width / 5 * 4, height /5 * 4);

    path.moveTo(130,32);
    path.cubicTo(19.709, -0.353,31.226,6.485,40,17);
    path.cubicTo(34.112,40.881, -19.137,114.545,-48,134);
    path.cubicTo(7.771,81.072,32.297,43.787,62,50);
    path.cubicTo(15.135,3.166,22.896,13.013,33,21);
    path.cubicTo(101.212,48.592,110.287,41.169,130,32);
    path.close();
    return path;
  }

  @override
  bool shouldReclip(CustomClipper oldClipper) => false;
}