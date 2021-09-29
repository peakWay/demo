import 'package:flutter/material.dart';

class FetchModel<T> {
  FetchModel({
    this.isFetching = false,
    this.isError = false,
    this.didInvalidate = false,
    this.data
  });

  bool isFetching;
  bool isError;
  bool didInvalidate;
  T data;
}

abstract class FetchState {

  //引用到这个类的必须在markNeedsBuild实现setState;
  void markNeedsBuild();

  @protected
  void request(FetchModel fetch) {
    fetch.isFetching = true;
  }

  @protected
  void requestBuild(FetchModel fetch) {
    request(fetch);
    markNeedsBuild();
  }

  @protected 
  void invalide(FetchModel fetch) {
    fetch.didInvalidate = true;
  }

  @protected
  void requestError(FetchModel fetch) {
    fetch.isFetching = false;
    fetch.didInvalidate = false;
    fetch.isError = true;
  }

  @protected
  void requestErrorBuild(FetchModel fetch) {
    requestError(fetch);
    markNeedsBuild();
  }

  @protected
  void receive(FetchModel fetch, payload) {
    fetch.isFetching = false;
    fetch.data = payload;
  }

  @protected
  void receiveBuild(FetchModel fetch, payload) {
    receive(fetch, payload);
    markNeedsBuild();
  }  

  void _fetch(FetchModel fetch, Future Function() fetchFunction) async{

    requestBuild(fetch);

    try {
      var res = await fetchFunction();

      receiveBuild(fetch, res);
    } catch (error) {
      requestErrorBuild(fetch);
    }
  }

  @protected
  void fetchIfNeed(FetchModel fetch, Future Function() fetchFunction) {
    if (shouldFetchState(fetch)) 
      _fetch(fetch, fetchFunction);  
  } 

  @protected
  bool shouldFetchState(FetchModel fetch) {
    if (fetch.data == null)
      return true;
    else if (fetch.isFetching)
      return false;
    else
      return fetch.didInvalidate;
  }
}