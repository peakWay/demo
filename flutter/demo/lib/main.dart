


import 'package:demo/packages/fetch/fetch.dart';
import 'package:demo/packages/fetch/fetch_list.dart';
import 'package:flutter/material.dart';

import 'base-lib/utils/iterable.dart';

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {

  
  @override
  Widget build(BuildContext context) {
    
      return MaterialApp(home: HomePage());
  }
}
class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {


    return Scaffold(
        appBar: AppBar(title: Text('demo')),
        body: Column(
          children: [
            Test()
          ],
        )
      );
  }
}


class Test extends StatefulWidget {
  @override
  _TestState createState() => _TestState();
}

class MyCustomData {
  MyCustomData({
    this.name
  });

  final name;
}

class _TestState extends State<Test> with FetchState, MultipleListFetch<Test, List> {

  FetchModel<MyCustomData> custom = FetchModel();

  Future<List> requestString() {
    return Future.delayed(Duration(seconds: 1), () {
      return ['文字1', '文字2'];
    });
  }

  Future<List> requestInt() {
    return Future.delayed(Duration(seconds: 1), () {
      return ['1', '2'];
    });
  }

  Future<MyCustomData> requestMyCustom() {
    return Future.delayed(Duration(seconds: 1), () {
      return MyCustomData(name: 'oldman');
    });
  }

  @override
  List<String> initTypes() {
    return ['string', 'int'];
  }

  @override
  Future<List> Function() fetchMulipleListFunction() {
    switch (selectedType) {
      case 'string':
        return requestString;
      case 'int':
        return requestInt;
      default: 
        return null;
    }
  }

  @override
  void initState() {
    super.initState();

    fetchListIfNeed('string');
  }
  
  @override
  Widget build(BuildContext context) {

    FetchModel<List> typeListModel = map[selectedType];

    List list= typeListModel.data;

    if (selectedType == 'string' && !typeListModel.isFetching && list != null) {
      List<String> sl = ListUtils.dynamicAsType(list);

      print(sl[0].split(''));
    }

    return Container(
      child: Column(
        children: [
          RaisedButton(
            onPressed: () {
              selectedType = selectedType == 'string' ? 'int' : 'string';
              fetchListIfNeed(selectedType);
            },
            child: Text(typeListModel.isFetching ? '加载中' : list.toString())
          ),
          RaisedButton(
            child: Text(custom.isFetching ? '加载中' : custom.data == null ? '' : custom.data.name),
            onPressed: () {
              fetchIfNeed(custom, requestMyCustom);
            },
          )
        ],
      ),
    );
  }
}

void main() => runApp(MyApp());

