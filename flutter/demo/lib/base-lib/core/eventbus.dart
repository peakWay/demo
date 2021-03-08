

/**
 * 实现通知在flutter常见的有两种:
 * 1.事件总线(与js中的eventBus类似)
 * 2.Listenable(更符合flutter的设计)
 */

import 'package:flutter/material.dart';

typedef void EventCallback(arg);

class EventBus {
  //定义一个私有的构造函数
  EventBus._internal();

  //唯一实例
  static EventBus _instance = new EventBus._internal();

  //工厂构造函数
  factory EventBus() => _instance;

  //保存订阅者队列，key为事件名，value为事件队列
  var _emap = new Map<Object, List<EventCallback>>();

  //添加订阅者
  void on (eventName, EventCallback f) {
    if (eventName == null || f == null) return;

    _emap[eventName] ??= new List<EventCallback>();

    _emap[eventName].add(f);
  }

  //删除订阅者
  void off(eventName, [EventCallback f]) {
    //可以一次性删除多个订阅
    var list = _emap[eventName];
    if (eventName == null || list == null) return;

    if (f == null) {
      //等于null全部删除
      _emap[eventName] = null;
    } else {
      list.remove(f);
    }
  }

  //触发订阅事件
  void emit(eventName, [arg]) {
    
  }
}
