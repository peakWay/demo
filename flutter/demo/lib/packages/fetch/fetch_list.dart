
import 'package:flutter/material.dart';
import 'fetch.dart';

mixin SingleFetch<T extends StatefulWidget, D> on State<T>, FetchState {
  void markNeedsBuild() {
    setState(() {});
  }
}

mixin MultipleListFetch<T extends StatefulWidget, D extends List> on State<T>, FetchState {
  String get selectedType => _selectedType;
  String _selectedType;
  set selectedType(String value) {
    assert(_types.contains(value));

    //不能设置为未初始化
    _selectedType = value;
    markNeedsBuild();
  } 

  Map<String, FetchModel<D>> get map => _map;
  Map<String, FetchModel<D>> _map = {};

  List<String> initTypes();

  List<String> _types;

  Future<D> Function() fetchMulipleListFunction();

  void markNeedsBuild() {
    setState(() {});
  }

  @override
  void initState() {

    super.initState();

    _types = initTypes();

    _types.forEach((type) {
      _map[type] = FetchModel<D>();
    });

    selectedType = _map.keys.toList()[0];
  } 

  void requestList(String selectedType) {
    request(_map[selectedType]);
  }

  void requestListBuild(String selectedType) {
    requestBuild(_map[selectedType]);
  }

  void invalideList(String selectedType) {
    request(_map[selectedType]);
  }

  void requestListError(String selectedType) {
    requestError(_map[selectedType]);
  }

  void requestListErrorBuild(String selectedType) {
    requestErrorBuild(_map[selectedType]);
  }

  void receiveList(String selectedType, D payload) {
    receive(_map[selectedType], payload);
  }

  void receiveListBuild(String selectedType, D payload) {
    receiveBuild(_map[selectedType], payload);
  }  

  void fetchListIfNeed(String selectedType) {
    fetchIfNeed(_map[selectedType], fetchMulipleListFunction());
  }
}


/**
 * 
 * 未分离的实现
 */
// mixin MultipleListFetch<T extends StatefulWidget> on State<T> {
//   String get selectedType => _selectedType;
//   String _selectedType;
//   set selectedType(String value) {
//     assert(_types.contains(value));

//     //不能设置为未初始化
//     _selectedType = value;
//     markNeedsBuild();
//   } 
  
//   Map<String, FetchModel<List>> get map => _map;
//   Map<String, FetchModel<List>> _map = {};

//   List<String> initTypes();

//   Future<List> fetch(String selectedType);

//   List<String> _types;

//   @override
//   void initState() {

//     super.initState();

//     _types = initTypes();

//     _types.forEach((type) {
//       _map[type] = FetchModel<List>();
//     });

//     selectedType = _map.keys.toList()[0];

//   }  

//   @protected
//   void requestList(String selectedType) {
//     _map[selectedType].isFetching = true;
//   }

//   @protected
//   void requestListBuild(String selectedType) {
//     requestList(selectedType);
//     markNeedsBuild();
//   }

//   @protected 
//   void invalide(String selectedType) {
//     _map[selectedType].didInvalidate = true;
//   }

//   @protected
//   void requestError(String selectedType) {
//     _map[selectedType].isFetching = false;
//     _map[selectedType].didInvalidate = false;
//     _map[selectedType].isError = true;
//   }

//   @protected
//   void requestErrorBuild(String selectedType) {
//     requestError(selectedType);
//     markNeedsBuild();
//   }

//   @protected
//   void receiveList(String selectedType, List payload) {
//     _map[selectedType].isFetching = false;
//     _map[selectedType].data = payload;
//   }

//   @protected
//   void receiveListBuild(String selectedType, List payload) {
//     receiveList(selectedType, payload);
//     markNeedsBuild();
//   }  

//   void _fetchList(String selectedType) async{

//     requestListBuild(selectedType);

//     try {
//       List res = await fetch(selectedType);

//       receiveListBuild(selectedType, res);
//     } catch (error) {
//       requestErrorBuild(selectedType);
//     }
//   }

//   void fetchListIfNeed(selectedType) {
//     if (shouldFetchState(selectedType)) 
//       _fetchList(selectedType);  
//   } 

//   @protected
//   bool shouldFetchState(selectedType) {
//     if (_map[selectedType].data == null)
//       return true;
//     else if (_map[selectedType].isFetching)
//       return false;
//     else
//       return _map[selectedType].didInvalidate;
//   }

//   void markNeedsBuild() {
//     setState(() {});
//   }
// }