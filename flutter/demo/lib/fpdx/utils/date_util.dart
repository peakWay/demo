import 'dart:ui';

import 'package:flutter/material.dart';

enum DateFormat {
  DEFAULT, //yyyy-MM-dd HH:mm:ss.SSS
  NORMAL, //yyyy-MM-dd HH:mm:ss
  YEAR_MONTH_DAY_HOUR_MINUTE, //yyyy-MM-dd HH:mm
  YEAR_MONTH_DAY, //yyyy-MM-dd
  YEAR_MONTH, //yyyy-MM
  MONTH_DAY, //MM-dd
  MONTH_DAY_HOUR_MINUTE, //MM-dd HH:mm
  HOUR_MINUTE_SECOND, //HH:mm:ss
  HOUR_MINUTE, //HH:mm

  ZH_DEFAULT, //yyyy年MM月dd日 HH时mm分ss秒SSS毫秒
  ZH_NORMAL, //yyyy年MM月dd日 HH时mm分ss秒  /  timeSeparate: ":" --> yyyy年MM月dd日 HH:mm:ss
  ZH_YEAR_MONTH_DAY_HOUR_MINUTE, //yyyy年MM月dd日 HH时mm分  /  timeSeparate: ":" --> yyyy年MM月dd日 HH:mm
  ZH_YEAR_MONTH_DAY, //yyyy年MM月dd日
  ZH_YEAR_MONTH, //yyyy年MM月
  ZH_MONTH_DAY, //MM月dd日
  ZH_MONTH_DAY_HOUR_MINUTE, //MM月dd日 HH时mm分  /  timeSeparate: ":" --> MM月dd日 HH:mm
  ZH_HOUR_MINUTE_SECOND, //HH时mm分ss秒
  ZH_HOUR_MINUTE, //HH时mm分
}

class DateUtil {
  static final num ONE_MINUTE = 60000;
  static final num ONE_HOUR = 3600000;
  static final num ONE_DAY = 86400000;
  static final num ONE_WEEK = 604800000;

  static final String ONE_SECOND_AGO = "秒前";
  static final String ONE_MINUTE_AGO = "分钟前";
  static final String ONE_HOUR_AGO = "小时前";
  static final String ONE_DAY_AGO = "天前";
  static final String ONE_MONTH_AGO = "月前";
  static final String ONE_YEAR_AGO = "年前";

  /// 格式化
  ///
  /// [date] 传入 DateTime 格式
  /// （距离现在时间一分钟以内是刚刚，一分钟以上，60分钟以下显示分钟。60分钟以上显示小时以整小时为单位。大于24小时显示n天前，超过5天显示日期2019/11/19）
  static String format(DateTime date) {
    num delta =
        DateTime.now().millisecondsSinceEpoch - date.millisecondsSinceEpoch;

    /// 1分钟
    if (delta < 1 * ONE_MINUTE) {
      return '刚刚';
    }

    if ( delta < ONE_HOUR ) {
      num minutes = toMinutes(delta);
      return (minutes <= 0 ? 1 : minutes).toInt().toString() + ONE_MINUTE_AGO;
    }

    if (delta < 24 * ONE_HOUR) {
      num hours = toHours(delta);
      return (hours <= 0 ? 1 : hours).toInt().toString() + ONE_HOUR_AGO;
    }

    if (delta < 5 * ONE_DAY) {
      num days = toDays(delta);
      return (days <= 0 ? 1 : days).toInt().toString() + ONE_DAY_AGO;
    }

    return '${date.year}/${date.month.toString().padLeft(2, '0')}/${date.day.toString().padLeft(2, '0')}';
  }

  static String weekdayToString(int weekday) {
    return ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'][weekday];
  }

  //消息时间显示
  static String calculateMessageTime(int timestamp) {
    if (timestamp == null || timestamp == 0) {
      return '';
    }
    DateTime now = DateTime.now();
    String nowString =
        DateUtil.formatDateTime(now.toString(), DateFormat.YEAR_MONTH_DAY);

    DateTime lastDay = now.subtract(Duration(days: 1));
    String lastDayString =
        DateUtil.formatDateTime(lastDay.toString(), DateFormat.YEAR_MONTH_DAY);

    DateTime time = DateTime.fromMillisecondsSinceEpoch(timestamp * 1000);
    String timeString =
        DateUtil.formatDateTime(time.toString(), DateFormat.YEAR_MONTH_DAY);

    String morningOrAfternoon = time.hour < 12 ? '上午' : '下午';

    int timeHours = time.hour > 12 ? time.hour - 12 : time.hour;
    String result =
        '$morningOrAfternoon $timeHours:${time.minute.toString().padLeft(2, '0')}';

    if (timeString == nowString) {
      return result;
    } else if (timeString == lastDayString) {
      return '昨天 $result';
    } else if (now.difference(time).inDays < 7) {
      print('time.weekday:${time.weekday}');
      return '${weekdayToString(time.weekday)} $result';
    } else {
      return '${time.year}年${time.month}月${time.day}日 $result';
    }
  }

  /// format DateTime.
  /// time            time string.
  /// format          DateFormat type.
  /// dateSeparate    date separate.
  /// timeSeparate    time separate.
  static String formatDateTime(String time, DateFormat format,
      {String dateSeparate, String timeSeparate}) {
    switch (format) {
      case DateFormat.NORMAL: //yyyy-MM-dd HH:mm:ss
        time = time.substring(0, "yyyy-MM-dd HH:mm:ss".length);
        break;
      case DateFormat.YEAR_MONTH_DAY_HOUR_MINUTE: //yyyy-MM-dd HH:mm
        time = time.substring(0, "yyyy-MM-dd HH:mm".length);
        break;
      case DateFormat.YEAR_MONTH_DAY: //yyyy-MM-dd
        time = time.substring(0, "yyyy-MM-dd".length);
        break;
      case DateFormat.YEAR_MONTH: //yyyy-MM
        time = time.substring(0, "yyyy-MM".length);
        break;
      case DateFormat.MONTH_DAY: //MM-dd
        time = time.substring("yyyy-".length, "yyyy-MM-dd".length);
        break;
      case DateFormat.MONTH_DAY_HOUR_MINUTE: //MM-dd HH:mm
        time = time.substring("yyyy-".length, "yyyy-MM-dd HH:mm".length);
        break;
      case DateFormat.HOUR_MINUTE_SECOND: //HH:mm:ss
        time =
            time.substring("yyyy-MM-dd ".length, "yyyy-MM-dd HH:mm:ss".length);
        break;
      case DateFormat.HOUR_MINUTE: //HH:mm
        time = time.substring("yyyy-MM-dd ".length, "yyyy-MM-dd HH:mm".length);
        break;
      default:
        break;
    }
    time = dateTimeSeparate(time, dateSeparate, timeSeparate);
    return time;
  }

  /// date Time Separate.
  static String dateTimeSeparate(
      String time, String dateSeparate, String timeSeparate) {
    if (dateSeparate != null) {
      time = time.replaceAll("-", dateSeparate);
    }
    if (timeSeparate != null) {
      time = time.replaceAll(":", timeSeparate);
    }
    return time;
  }

  /// is today.
  /// 是否是当天.
  static bool isToday(int milliseconds, {bool isUtc = false}) {
    if (milliseconds == null || milliseconds == 0) return false;
    DateTime old =
        DateTime.fromMillisecondsSinceEpoch(milliseconds, isUtc: isUtc);
    DateTime now = isUtc ? DateTime.now().toUtc() : DateTime.now().toLocal();
    return old.year == now.year && old.month == now.month && old.day == now.day;
  }

  /// is yesterday by millis.
  /// 是否是昨天.
  static bool isYesterdayByMillis(int millis, int locMillis) {
    return isYesterday(DateTime.fromMillisecondsSinceEpoch(millis),
        DateTime.fromMillisecondsSinceEpoch(locMillis));
  }

  /// is yesterday by dateTime.
  /// 是否是昨天.
  static bool isYesterday(DateTime dateTime, DateTime locDateTime) {
    if (yearIsEqual(dateTime, locDateTime)) {
      int spDay = getDayOfYear(locDateTime) - getDayOfYear(dateTime);
      return spDay == 1;
    } else {
      return ((locDateTime.year - dateTime.year == 1) &&
          dateTime.month == 12 &&
          locDateTime.month == 1 &&
          dateTime.day == 31 &&
          locDateTime.day == 1);
    }
  }

  /// year is equal.
  /// 是否同年.
  static bool yearIsEqual(DateTime dateTime, DateTime locDateTime) {
    return dateTime.year == locDateTime.year;
  }

  /// get day of year.
  /// 在今年的第几天.
  static int getDayOfYear(DateTime dateTime) {
    /// month->days.
    Map<int, int> MONTH_DAY = {
      1: 31,
      2: 28,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31,
    };
    int year = dateTime.year;
    int month = dateTime.month;
    int days = dateTime.day;
    for (int i = 1; i < month; i++) {
      days = days + MONTH_DAY[i];
    }
    if (isLeapYearByYear(year) && month > 2) {
      days = days + 1;
    }
    return days;
  }

  /// Return whether it is leap year.
  static bool isLeapYearByYear(int year) {
    return year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
  }

  /// 登录颜色值
  static Color parseUserColor(int loginAt) {
    print("loginAt:${loginAt}");
    if (loginAt == null) {
      return null;
    }
    var date = new DateTime.fromMillisecondsSinceEpoch(loginAt * 1000);
    num delta = DateTime.now().millisecondsSinceEpoch - date.millisecondsSinceEpoch;

    /// 1小时之内 绿色
    if (delta < 1 * ONE_HOUR) {
      return Color(0xff48EB00);
    } else if (delta > ONE_HOUR && delta < 48 * ONE_HOUR) {
      /// 1 - 48 小时之内
      return Color(0xffF5FF00);
    }  else {
      return null;
    }
  }

  /// 读取时间戳
  static num timestamp(int timestamp) {
    if (timestamp == null) {
      return 0;
    }
    var date = new DateTime.fromMillisecondsSinceEpoch(timestamp * 1000);
    num delta =
        DateTime.now().millisecondsSinceEpoch - date.millisecondsSinceEpoch;
    return delta;
  }

  /// 读取时间戳
  static String readTimestamp(int timestamp) {
    if (timestamp == null || timestamp == 0) {
      return '';
    }
    var date = new DateTime.fromMillisecondsSinceEpoch(timestamp * 1000);
    var time = '';
    time = DateUtil.format(date);
    return time;
  }

  /// 读取时间戳
  static String readTimestamp2(int timestamp) {
    if (timestamp == null || timestamp == 0) {
      return '';
    }

    DateTime now = DateTime.now();
    DateTime date = new DateTime.fromMillisecondsSinceEpoch(timestamp * 1000);

    Duration diff = now.difference(date);
    int mins = diff.inMinutes;
    int hours = diff.inHours;
    int days = diff.inDays;


    if( mins == 0 ) {
      return '刚刚';
    } else if( mins < 60 ) {
      return '$mins分钟前';
    } else if ( hours < 24) {
      return '$hours小时前';
    }  else if ( days < 30 ) {
      return '$days天前';
    } else if ( days < 365 ) {
      return '${days ~/ 30}月前';
    } else if( days > 365 ) {
      return '${days ~/ 365}年前';
    } else {
      return '';
    }
  }

  /// 返回星期几字符串
  static weekDay(String weekDay) {
    switch (weekDay) {
      case '1':
        return '星期一';
      case '2':
        return '星期二';
      case '3':
        return '星期三';
      case '4':
        return '星期四';
      case '5':
        return '星期五';
      case '6':
        return '星期六';
      case '7':
        return '星期日';
      default:
        return '星期一';
    }
  }

  /// 当前时间字符串
  static currentTime() {
    var now = new DateTime.now();
    var a = now.millisecondsSinceEpoch;
    return DateTime.fromMillisecondsSinceEpoch(a).toString();
  }

  static getDateString(int timestamp) {
    if (timestamp == null || timestamp <= 0){
      return '';
    }
    DateTime dateTime = DateTime.fromMillisecondsSinceEpoch(timestamp * 1000);
    return '${dateTime.year}-${dateTime.month}-${dateTime.day}';
  }

  /// 时间戳转换小时
  static num currentMinutes(num timestamp) {
    if (timestamp == null) {
      return 0;
    }
    var date = new DateTime.fromMillisecondsSinceEpoch(timestamp * 1000);
    num delta =
        DateTime.now().millisecondsSinceEpoch - date.millisecondsSinceEpoch;

    double minute = DateUtil.toMinutes(delta);
    print("minutes${minute}");
    return minute ?? 0;
  }

  /// 时间戳转换秒
  static num toSeconds(num date) {
    return date / 1000;
  }

  /// 时间戳转换分钟
  static num toMinutes(num date) {
    return toSeconds(date) / 60;
  }

  /// 时间戳转换小时
  static num toHours(num date) {
    return toMinutes(date) / 60;
  }

  /// 时间戳转换天
  static num toDays(num date) {
    return toHours(date) / 24;
  }

  /// 时间戳转换月
  static num toMonths(num date) {
    return toDays(date) / 30;
  }

  /// 时间戳转换年
  static num toYears(num date) {
    return toMonths(date) / 12;
  }

  static DateTime parseGMT(String date) {
    final int SP = 32;
    const List wkdays = const ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const List weekdays = const [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
    const List months = const [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    final int formatRfc1123 = 0;
    final int formatRfc850 = 1;
    final int formatAsctime = 2;

    int index = 0;
    String tmp;
    int format;

    void expect(String s) {
      if (date.length - index < s.length) {
        throw new FormatException("Invalid HTTP date $date");
      }
      String tmp = date.substring(index, index + s.length);
      if (tmp != s) {
        throw new FormatException("Invalid HTTP date $date");
      }
      index += s.length;
    }

    int expectWeekday() {
      int weekday;
      // The formatting of the weekday signals the format of the date string.
      int pos = date.indexOf(",", index);
      if (pos == -1) {
        int pos = date.indexOf(" ", index);
        if (pos == -1) throw new FormatException("Invalid HTTP date $date");
        tmp = date.substring(index, pos);
        index = pos + 1;
        weekday = wkdays.indexOf(tmp);
        if (weekday != -1) {
          format = formatAsctime;
          return weekday;
        }
      } else {
        tmp = date.substring(index, pos);
        index = pos + 1;
        weekday = wkdays.indexOf(tmp);
        if (weekday != -1) {
          format = formatRfc1123;
          return weekday;
        }
        weekday = weekdays.indexOf(tmp);
        if (weekday != -1) {
          format = formatRfc850;
          return weekday;
        }
      }
      throw new FormatException("Invalid HTTP date $date");
    }

    int expectMonth(String separator) {
      int pos = date.indexOf(separator, index);
      if (pos - index != 3) throw new FormatException("Invalid HTTP date $date");
      tmp = date.substring(index, pos);
      index = pos + 1;
      int month = months.indexOf(tmp);
      if (month != -1) return month;
      throw new FormatException("Invalid HTTP date $date");
    }

    int expectNum(String separator) {
      int pos;
      if (separator.length > 0) {
        pos = date.indexOf(separator, index);
      } else {
        pos = date.length;
      }
      String tmp = date.substring(index, pos);
      index = pos + separator.length;
      try {
        int value = int.parse(tmp);
        return value;
      } on FormatException {
        throw new FormatException("Invalid HTTP date $date");
      }
    }

    void expectEnd() {
      if (index != date.length) {
        throw new FormatException("Invalid HTTP date $date");
      }
    }

    int weekday = expectWeekday();
    int day;
    int month;
    int year;
    int hours;
    int minutes;
    int seconds;
    if (format == formatAsctime) {
      month = expectMonth(" ");
      if (date.codeUnitAt(index) == SP) index++;
      day = expectNum(" ");
      hours = expectNum(":");
      minutes = expectNum(":");
      seconds = expectNum(" ");
      year = expectNum("");
    } else {
      expect(" ");
      day = expectNum(format == formatRfc1123 ? " " : "-");
      month = expectMonth(format == formatRfc1123 ? " " : "-");
      year = expectNum(" ");
      hours = expectNum(":");
      minutes = expectNum(":");
      seconds = expectNum(" ");
      expect("GMT");
    }
    expectEnd();
    return new DateTime.utc(year, month + 1, day, hours, minutes, seconds, 0);
  }
}
