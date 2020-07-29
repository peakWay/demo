
abstract class Person {
  Person(this.name);
  final name;
  void sayHello() {
    print('name');
  }

  void start() => sayHello();
}

class Person2 {
  Person2(this.name);
  final name;
  void sayHello() => name;
}

class Man extends Person {
  Man({this.sex}):super(sex);

  final sex;

  // void sayName() => sayHello();

  void sayHello() {
    print('hello');
  }
}

class Women extends Person2 {
  Women(name):super(name);

  @override
  void sayHello() {
    // TODO: implement sayHello
    super.sayHello();
  }
}