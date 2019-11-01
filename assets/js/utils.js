export default {
  unLimitTreeLevel(arr, id = 0) {
    var temp = [],
      lev = 0;
    var forFn = function (arr, id, lev) {
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (item.pid == id) {
          item.level = lev;
          item.html = ''
          for (let index = 0; index < lev; index++) {
            item.html += ' -- '
          }
          temp.push(item);
          forFn(arr, item.id, lev + 1);
        }
      }
    };
    forFn(arr, id, lev);
    return temp;
  }
}
