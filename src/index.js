import './style/table_elm.scss'

let sortFunc;
try {
  sortFunc = Symbol('sortFunc');
} catch (error) {
  sortFunc = 'sortFunc';
}

let addEvent = (function (el, type, fn) {
  var fn;
  try {
    var el = document.createElement('div');
    if (el.addEventListener) {
      fn = function (el, type, fn) {
        el.addEventListener(type, fn, false);
      }
    }

  } catch (e) {
    fn = function (el, type, fn) {
      el.attachEvent('on' + type, fn);
    }
  }

  return fn;
})();

// 定义排序的table类
class Tables {
  constructor(clsName) {
    let el = document.querySelectorAll(clsName);
    if (el.length === 0) {
      throw new Error('没有指定元素类名');
    }
    this.tbs = Array.prototype.slice.call(el, 0);
    this.tbsExtract = [];
    this.init();
  }

  // 初始化所有的table
  init() {
    this.tbs.forEach(element => {
      // 为每个table加上样式class类名
      if (element.className.indexOf('table__sort') === -1) {
        element.className = element.className + ' table__sort';
      }

      let extract = new TableSort(element);
      this.tbsExtract.push(extract);
    });
  }
}

class TableSort {
  constructor(el) {
    this.el = el;
    this.isSort = [];
    this.init();
  }

  // 排序函数，依照这个函数来排序
  [sortFunc](n, rows, reverse) {
    var chineseStrings = [],
      normalStrings = [],
      nums = [];
    // 判断当前点击之前有没有排序,如果有排序则直接反转
    if (this.isSort[n]) {
      for (let i = rows.length-1; i > -1; i--) {
        const element = rows[i];
        this.el.tBodies[0].appendChild(element);
      }
      return;
    }
    // 如果没有排序，把其它列的排序状态清除，并加上所在行的排序状态为已排序
    for (let i = 0; i < this.isSort.length; i++) {
      this.isSort[i] = false;
    }
    this.isSort[n] = true;
    for (let i = 0; i < rows.length; i++) {
      const element = rows[i];
      const elementText = element.children[n].textContent || element.children[n].innerText;

      if (isNaN(elementText)) {
        // 如果以中文开头，提取到指定数组后用localeCompare排序
        if (elementText.charAt(0).charCodeAt() > 255) {
          chineseStrings.push(element);
        } else {
          // 英文开头，提取到英文数组
          normalStrings.push(element);
        }
      } else {
        // 数字开头，提取到数字数组
        nums.push(element);
      }
    }

    chineseStrings.sort((a, b) => {
      let aText = a.children[n].textContent || a.children[n].innerText;
      let bText = b.children[n].textContent || b.children[n].innerText;
      return aText.localeCompare(bText, 'zh-Hans-CN', {
        'sensitivity': 'accent'
      });
    });
    normalStrings.sort((a, b) => {
      let aText = a.children[n].textContent || a.children[n].innerText;
      let bText = b.children[n].textContent || b.children[n].innerText;
      return aText.localeCompare(bText);
    })
    nums.sort((a, b) => {
      let aText = a.children[n].textContent || a.children[n].innerText;
      let bText = b.children[n].textContent || b.children[n].innerText;
      return aText - bText;
    })

    let sortedArray = [].concat(nums, normalStrings, chineseStrings);
    sortedArray.forEach((el) => {
      this.el.tBodies[0].appendChild(el);
    })
    // return [].concat(nums, normalStrings, chineseStrings);
  }

  // 排序事件, 按照第n列排序
  sortRow(n) {
    let rows = Array.prototype.slice.call(this.el.tBodies[0].children, 0);
    this[sortFunc].call(this, n, rows);
  }

  // 在表头上绑定click事件，如果不存在表头就提示必须设置表头
  init() {
    var els;
    if (this.el.firstElementChild.nodeName !== 'THEAD') {
      throw new Error('不存在表头，请设置表头')
    }
    els = Array.prototype.slice.call(this.el.firstElementChild.children[0].children, 0);
    els.forEach((el, index) => {
      var that = this;
      console.log('yes', index);
      this.isSort.push(false);

      addEvent(el, 'click', function (e) {
        console.log('点击', index)
        that.sortRow(index);
      });
    })
  }
}

new Tables('.table');