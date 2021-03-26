
import 'package:flutter/material.dart';
import 'fetch.dart';

mixin SingleListFetch<T extends StatefulWidget, D extends List> on State<T> {
  FetchModel<D> get listHandler => _listHandler;
  FetchModel<D> _listHandler;

  Future<List> fetch();

  @protected
  void requestList() {
    _listHandler.isFetching = true;
  }

  @protected
  void requestListBuild() {
    requestList();
    markNeedsBuild();
  }

  @protected 
  void invalide() {
    _listHandler.didInvalidate = true;
  }

  @protected
  void requestError() {
    _listHandler.isFetching = false;
    _listHandler.didInvalidate = false;
    _listHandler.isError = true;
  }

  @protected
  void requestErrorBuild() {
    requestError();
    markNeedsBuild();
  }

  @protected
  void receiveList(D payload) {
    _listHandler.isFetching = false;
    _listHandler.data = payload;
  }

  @protected
  void receiveListBuild(D payload) {
    receiveList(payload);
    markNeedsBuild();
  }  

  void _fetchList() async{

    requestListBuild();

    try {
      D res = await fetch();

      receiveListBuild(res);
    } catch (error) {
      requestErrorBuild();
    }
  }

  void fetchListIfNeed() {
    if (shouldFetchState()) 
      _fetchList();  
  } 

  @protected
  bool shouldFetchState() {
    if (_listHandler.data == null)
      return true;
    else if (_listHandler.isFetching)
      return false;
    else
      return _listHandler.didInvalidate;
  }
  
  void markNeedsBuild() {
    setState(() {});
  }
}

mixin MultipleListFetchs<T extends StatefulWidget, D> on FetchState<T, D> {
  String get selectedType => _selectedType;
  String _selectedType;
  set selectedType(String value) {
    assert(_types.contains(value));

    //不能设置为未初始化
    _selectedType = value;
    markNeedsBuild();
  } 

  Map<String, FetchModel<List>> get map => _map;
  Map<String, FetchModel<List>> _map = {};

  List<String> initTypes();

  Future<List> fetch(String selectedType as [dynamic arg]);

  List<String> _types;

  @override
  void initState() {

    super.initState();

    _types = initTypes();

    _types.forEach((type) {
      _map[type] = FetchModel<List>();
    });

    selectedType = _map.keys.toList()[0];

  } 

  void requestList(String selectedType) {
    super.request(_map[selectedType]);
  }

  void requestListBuild(String selectedType) {
    super.request(_map[selectedType]);
  }

  void invalideList(String selectedType) {
    super.request(_map[selectedType]);
  }

  void requestListError(String selectedType) {
    super.requestError(_map[selectedType]);
  }

  void requestListErrorBuild(String selectedType) {
    super.requestErrorBuild(_map[selectedType]);
  }

  void receiveList(String selectedType, D payload) {
    super.receive(_map[selectedType], payload);
  }

  void receiveListBuild(String selectedType, D payload) {
    super.receiveBuild(_map[selectedType], payload);
  }  

  @override
  bool shouldFetchState(String selectedType) {
    return super.shouldFetchState(_map[selectedType]);
  }

  

}

mixin MultipleListFetch<T extends StatefulWidget> on State<T> {
  String get selectedType => _selectedType;
  String _selectedType;
  set selectedType(String value) {
    assert(_types.contains(value));

    //不能设置为未初始化
    _selectedType = value;
    markNeedsBuild();
  } 
  
  Map<String, FetchModel<List>> get map => _map;
  Map<String, FetchModel<List>> _map = {};

  List<String> initTypes();

  Future<List> fetch(String selectedType);

  List<String> _types;

  @override
  void initState() {

    super.initState();

    _types = initTypes();

    _types.forEach((type) {
      _map[type] = FetchModel<List>();
    });

    selectedType = _map.keys.toList()[0];

  }  

  @protected
  void requestList(String selectedType) {
    _map[selectedType].isFetching = true;
  }

  @protected
  void requestListBuild(String selectedType) {
    requestList(selectedType);
    markNeedsBuild();
  }

  @protected 
  void invalide(String selectedType) {
    _map[selectedType].didInvalidate = true;
  }

  @protected
  void requestError(String selectedType) {
    _map[selectedType].isFetching = false;
    _map[selectedType].didInvalidate = false;
    _map[selectedType].isError = true;
  }

  @protected
  void requestErrorBuild(String selectedType) {
    requestError(selectedType);
    markNeedsBuild();
  }

  @protected
  void receiveList(String selectedType, List payload) {
    _map[selectedType].isFetching = false;
    _map[selectedType].data = payload;
  }

  @protected
  void receiveListBuild(String selectedType, List payload) {
    receiveList(selectedType, payload);
    markNeedsBuild();
  }  

  void _fetchList(String selectedType) async{

    requestListBuild(selectedType);

    try {
      List res = await fetch(selectedType);

      receiveListBuild(selectedType, res);
    } catch (error) {
      requestErrorBuild(selectedType);
    }
  }

  void fetchListIfNeed(selectedType) {
    if (shouldFetchState(selectedType)) 
      _fetchList(selectedType);  
  } 

  @protected
  bool shouldFetchState(selectedType) {
    if (_map[selectedType].data == null)
      return true;
    else if (_map[selectedType].isFetching)
      return false;
    else
      return _map[selectedType].didInvalidate;
  }

  void markNeedsBuild() {
    setState(() {});
  }
}