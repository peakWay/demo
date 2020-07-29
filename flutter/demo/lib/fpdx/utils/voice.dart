/// created by simiaodong
/// created at 2019-09-14
//

import 'package:demo/fpdx/utils/url.dart';

/// 语音相关工具函数
class VoiceUtils {
  static int getSecondDurationFromSrc(String src) {
    try {
      var query = UrlUtils.getQueryFromUrl(src);

      if (!query.containsKey('duration')) {
        return 0;
      } else if( query['duration'] == 'null' ) {
        return 0;
      }

      return (double.parse(query['duration']) / 1000).round();
    } catch (e) {
      return 0;
    }
  }
}
