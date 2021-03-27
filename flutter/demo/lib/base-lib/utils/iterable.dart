
/* 
  迭代器
  1.Iterable
  2.List
  3.Map
  4.Set
 */


///Iterable
///fold类似js中的reduce


class ListUtils {
  static List<E> dynamicAsType<E>(List list) {
    assert(E is! int);
    
    return list.map((item) => item as E).toList();
  }
}