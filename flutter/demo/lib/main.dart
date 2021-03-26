


import 'package:demo/packages/fetch/fetch.dart';
import 'package:demo/packages/fetch/fetch_list.dart';
import 'package:flutter/material.dart';

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

class _TestState extends State<Test> with MultipleListFetch<Test> {

  Future<List<String>> requestString() {
    return Future.delayed(Duration(seconds: 1), () {
      return ['文字1', '文字2'];
    });
  }

  Future<List<int>> requestInt() {
    return Future.delayed(Duration(seconds: 1), () {
      return [1, 2];
    });
  }

  @override
  List<String> initTypes() {
    return ['string', 'int'];
  }

  @override
  Future<List> fetch(String selectedType) {
    switch (selectedType) {
      case 'string':
        return requestString();
      case 'int':
        return requestInt();
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

    FetchModel item = map[selectedType];

    List list= map[selectedType].data;

    print('$selectedType, $list, ${list == null ? '没数据' : selectedType == 'string' ? (list as List<String>)[0] : (list as List<int>)[1]}');

    return Container(
      child: RaisedButton(
        onPressed: () {
          selectedType = selectedType == 'string' ? 'int' : 'string';
          fetchListIfNeed(selectedType);
        },
        child: Text(item.isFetching ? '加载中' : list.toString())
      ),
    );
  }
}

void main() => runApp(MyApp());

