


import 'package:demo/packages/fetch/fetch.dart';
import 'package:demo/packages/fetch/fetch_list.dart';
import 'package:flutter/material.dart';

import 'base-lib/utils/iterable.dart';

// class VisibleState<T> extends State{

//   bool get visible => _visible;
//   bool _visible;

//   @override
//   didShow() {
//     _visible = true;
//     setState(() {});
//   }

//   @protected
//   didHide() {
//     _visible = false;
//   }

//   install() {

//   }
// }


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

class _TestState extends State<Test> with FetchState<List>, MultipleListFetchs<Test, List> {

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
      child: RaisedButton(
        onPressed: () {
          selectedType = selectedType == 'string' ? 'int' : 'string';
          fetchListIfNeed(selectedType);
        },
        child: Text(typeListModel.isFetching ? '加载中' : list.toString())
      ),
    );
  }
}

void main() => runApp(MyApp());

