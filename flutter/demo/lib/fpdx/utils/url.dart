class UrlUtils {
  /// 从url解析query
  static Map<String, dynamic> getQueryFromUrl(String url) {
    Map<String, dynamic> query = {};

    // 不带query, 不再解析, 直接返回
    if (url == null || url.isEmpty || !url.contains('?')) {
      return query;
    }

    String queryString = url.split('?')[1];

    if (queryString.isEmpty) {
      return query;
    }

    List<String> queryStringItems = queryString.split('&');

    queryStringItems.forEach((String item) {
      List<String> queryItemKv = item.split('=');
      query[queryItemKv[0]] = queryItemKv[1];
    });

    return query;
  }
}
