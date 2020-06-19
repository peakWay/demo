import 'package:flutter_screenutil/flutter_screenutil.dart';

/// created by simiaodong
/// created at 2019-09-26
//

/// 屏幕适配
class AdaptationUtils {
  static double px(double size) {
    return setWidth(size);
  }

  static double setWidth(double size) {
    return size.w;
  }

  static double height(double size) {
    return size.h;
  }

  static double setHeight(double size) {
    return size.h;
  }

  static double fontSize(double size) {
    return size.sp;
  }

  static double setSp(double size) {
    return size.sp;
  }
}
