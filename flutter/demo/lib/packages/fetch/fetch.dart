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


abstract class FetchState<T extends StatefulWidget, D> extends State<T> {

  Future<D> fetch([dynamic arg]);

  @protected
  void request(FetchModel fetchState) {
    fetchState.isFetching = true;
  }

  @protected
  void requestBuild(FetchModel fetchState) {
    request(fetchState);
    markNeedsBuild();
  }

  @protected 
  void invalide(FetchModel fetchState) {
    fetchState.didInvalidate = true;
  }

  @protected
  void requestError(FetchModel fetchState) {
    fetchState.isFetching = false;
    fetchState.didInvalidate = false;
    fetchState.isError = true;
  }

  @protected
  void requestErrorBuild(FetchModel fetchState) {
    requestError(fetchState);
    markNeedsBuild();
  }

  @protected
  void receive(FetchModel fetchState, D payload) {
    fetchState.isFetching = false;
    fetchState.data = payload;
  }

  @protected
  void receiveBuild(FetchModel fetchState, D payload) {
    receive(fetchState, payload);
    markNeedsBuild();
  }  

  void _fetch(FetchModel fetchState) async{

    requestBuild(fetchState);

    try {
      D res = await fetch();

      receiveBuild(fetchState, res);
    } catch (error) {
      requestErrorBuild(fetchState);
    }
  }

  @protected
  void fetchIfNeed(FetchModel fetchState) {
    if (shouldFetchState(fetchState)) 
      _fetch(fetchState);  
  } 

  @protected
  bool shouldFetchState(FetchModel fetchState) {
    if (fetchState.data == null)
      return true;
    else if (fetchState.isFetching)
      return false;
    else
      return fetchState.didInvalidate;
  }

  void markNeedsBuild() {
    setState(() {});
  }
}