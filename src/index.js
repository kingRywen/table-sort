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
export default class Tables {
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
    this.originSort = Array.prototype.slice.call(this.el.tBodies[0].children, 0);
    this.theadEls = Array.prototype.slice.call(this.el.firstElementChild.children[0].children, 0);
    this.init();
  }

  // 排序函数，依照这个函数来排序
  [sortFunc](n, rows, reverse) {
    var chineseStrings = [],
      normalStrings = [],
      nums = [];
    // 判断当前点击之前有没有排序,如果有排序则直接反转
    if (this.isSort[n]) {
      // 判断是正序还是反序
      if (this.theadEls[n].getElementsByTagName('span')[0].firstChild.className === '') {
        // 正序
        this.theadEls[n].getElementsByTagName('span')[0].firstChild.className = 'live';
        this.theadEls[n].getElementsByTagName('span')[0].lastChild.className = '';
        for (let i = rows.length - 1; i > -1; i--) {
          const element = rows[i];
          this.el.tBodies[0].appendChild(element);
        }
      } else {
        // 反序
        this.theadEls[n].getElementsByTagName('span')[0].firstChild.className = '';
        this.theadEls[n].getElementsByTagName('span')[0].lastChild.className = '';
        this.originSort.forEach((el) => {
          this.el.tBodies[0].appendChild(el);
        });
        this.isSort[n] = false;
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

    // 排序完后把排序的行标记为顺序
    this.theadEls.forEach((el) => {
      el.getElementsByTagName('span')[0].lastChild.className = '';
      el.getElementsByTagName('span')[0].firstChild.className = '';
    })
    this.theadEls[n].getElementsByTagName('span')[0].lastChild.className = 'live';
  }

  // 排序事件, 按照第n列排序
  sortRow(n) {
    let rows = Array.prototype.slice.call(this.el.tBodies[0].children, 0);
    this[sortFunc].call(this, n, rows);
  }

  // 在表头上绑定click事件，如果不存在表头就提示必须设置表头
  init() {
    // var els;
    let tdEls = this.el.tBodies[0].getElementsByTagName('td');  
    if (this.el.firstElementChild.nodeName !== 'THEAD') {
      throw new Error('不存在表头，请设置表头')
    }

    // els = Array.prototype.slice.call(this.el.firstElementChild.children[0].children, 0);

    // 遍历thead里的单元格绑定事件
    this.theadEls.forEach((el, index) => {
      console.log('yes', index);
      var that = this;
      let elNodes = el.childNodes;
      this.isSort.push(false);

      // 在每个el中加入指示排序状态的箭头
      let div = document.createElement('div');
      div.className = 'cell';
      let arrowSpan = document.createElement('span');
      let reverseArrow = document.createElement('i');
      let arrow = document.createElement('i');
      arrowSpan.appendChild(reverseArrow);
      arrowSpan.appendChild(arrow);
      for (let i = 0; i < elNodes.length; i++) {
        const element = elNodes[i];
        div.appendChild(element);
      }
      div.appendChild(arrowSpan);
      el.appendChild(div);

      // 绑定表头点击排序事件
      addEvent(el, 'click', function (e) {
        e.preventDefault();
        console.log('点击', index)
        that.sortRow(index);
      });
    });

    // 如果sort属性存在，一开始就排序
    if (this.el.dataset.sort === 'first') {
      this.sortRow(0);
    }
  }
}