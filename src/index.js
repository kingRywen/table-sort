// 定义排序的table类
class Tables {
  constructor(clsName) {
    let el = document.querySelectorAll(clsName);
    this.tbs = Array.prototype.slice.call(el, 0);
    this.tbsExtract = [];
  }

  // 初始化所有的table
  init () {
    this.tbs.forEach(element => {
      let extract = new TableSort(element);
      this.tbsExtract.push(extract);
    });
  }
}

class TableSort {
  constructor (el) {
    this.el = el
  }

  // 初始化table类
  init () {

  }

  // 排序事件, 按照第n列排序
  sortRow (n) {
    let rows = this.el
  }
}