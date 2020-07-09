
//全局事件总线

typedef void EventCallback(arg);

class EventBus {
  EventBus._internal();

  //保存全局唯一单例
  static EventBus _singleInstance = new EventBus._internal();

  factory EventBus() => _singleInstance;

  var _emap = new Map<Object, List<EventCallback>>();

  void on(eventName, EventCallback f) {
    if (eventName == null || f == null) return;

    _emap[eventName] ??= new List<EventCallback>();

    _emap[eventName].add(f);
  }

  void off(eventName, [EventCallback f]) {
    var list = _emap[eventName];
    if (eventName == null || list == null) return;
    
    if (f == null) {
      _emap[eventName] = null;
    } else {
      list.remove(f);
    }
  }

  void emit(eventName, [arg]) {
    if (eventName == null) return;
    var list = _emap[eventName];
    if (list == null) return;
    
    //预防回调中执行off移除自身带来的下表错位
    int len = list.length - 1;

    for (var i = len; i > -1; --i) {
      list[i](arg);
    }
  }
}