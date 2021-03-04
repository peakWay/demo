import 'package:flutter/material.dart';


class MyListView extends StatefulWidget {
  @override
  _MyListViewState createState() => _MyListViewState();
}

class _MyListViewState extends State<MyListView> {
  ScrollController _controller = new ScrollController();
  int num = 0;

  @override
  void initState() {
    super.initState();

    _controller.addListener(() { 
      print('${_controller.position}');
    });
  }

  @override
  void didUpdateWidget(covariant MyListView oldWidget) {
    super.didUpdateWidget(oldWidget);
    print('我执行了');
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: double.infinity,
          height: 240,
          child: ListView.builder(
            controller: _controller,
            addAutomaticKeepAlives: false,
            itemCount: 20,
            itemBuilder: (BuildContext context, int index) {
              return Container(
                width: double.infinity,
                height: 30,
                color: Colors.orange[100 * (index % 9)],
                child: Text('第$index个')
              );
            },
          ),
        ),
        Container(
          width: double.infinity,
          height: 240,
          padding: EdgeInsets.only(top: 60),
          child: ListView.builder(
            // controller: _controller,
            itemCount: 20,
            itemBuilder: (BuildContext context, int index) {
              return Container(
                width: double.infinity,
                height: 30,
                color: Colors.blue[100 * (index % 9)],
                child: Text('第$index个')
              );
            },
          ),
        ),
        Row(
          children: [
            FlatButton(
              onPressed: () {
                _controller.animateTo(100, duration: Duration(milliseconds: 300), curve: Curves.ease);
              }, 
              child: Text('移动到')
            ),
            FlatButton(onPressed: () async {
              var result = await Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) {
                    return Container(
                      child: Text('我是第二个页面'),
                    );
                  },
                ),
              );
            }, child: Text('跳转')),
            FlatButton(
              onPressed: () {
                _controller.detach(_controller.position);
              }, 
              child: Text('销毁')
            ),
          ],
        )
      ]
    );
  }
}
 

class Temp extends StatefulWidget {
  @override
  _TempState createState() => _TempState();
}

class _TempState extends State<Temp> {

  @override
  void didUpdateWidget(covariant Temp oldWidget) {
    super.didUpdateWidget(oldWidget);
    print('儿子触发');
  }
  @override
  Widget build(BuildContext context) {
    return Container(
      
    );
  }
}


class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: Scaffold(
        appBar: AppBar(title: Text('demo')),
        body: MyListView(),
      )
    );
  }
}

void main() => runApp(MyApp());


