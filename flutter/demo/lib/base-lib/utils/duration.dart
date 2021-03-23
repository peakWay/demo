


class DayTime {
  int _day, _hour, _minute, _second;
  static const String formatDefault = 'HH:mm:ss';

  DayTime(day, hour, minute, second) {
    this._day = day;
    this._hour = hour; 
    this._minute = minute;
    this._second = second;
  }

  DayTime.zero(): this(0, 0, 0, 0);

  DayTime.fromDuration(Duration duration) {
    List<String> parts = duration.toString().split(':');

    int hour = int.parse(parts[0]);

    this._day = hour ~/ 24;
    this._hour = hour % 24;
    this._minute = int.parse(parts[1]);
    this._second = double.parse(parts[2]).toInt();
  } 
  

  DayTime.fromDurationNoDay(Duration duration) {
    List<String> parts = duration.toString().split(':');

    this._day = 0;
    this._hour = int.parse(parts[0]);
    this._minute = int.parse(parts[1]);
    this._second = double.parse(parts[2]).toInt();
  }

  bool get isZero => this.day == 0 && this.hour == 0 && this.minute  == 0 && this.second == 0;

  String format([String formatString]) {
    formatString ??= formatDefault;

    Map<String, String> matches= {
      'D': this.day.toString(),
      'DD': this.day.toString().padLeft(2, '0'),
      'H': this.hour.toString(),
      'HH': this.hour.toString().padLeft(2, '0'),
      'm': this.minute.toString(),
      'mm': this.minute.toString().padLeft(2, '0'),
      's': this.second.toString(),
      'ss': this.second.toString().padLeft(2, '0')
    };

    Pattern pattern = RegExp(r'\[([^\]]+)]|D{1,2}|d{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}');

    return formatString.replaceAllMapped(pattern, (match){
      return matches[match.group(0)];
    });
    
  }
  
  int get day => _day;
  int get hour => _hour;
  int get minute => _minute;
  int get second => _second;
}