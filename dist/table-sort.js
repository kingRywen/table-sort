!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.TableSort=t():e.TableSort=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Tables=void 0;var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();n(2);var s=void 0;try{s=Symbol("sortFunc")}catch(e){s="sortFunc"}var a=function(e,t,n){try{document.createElement("div").addEventListener&&(n=function(e,t,n){e.addEventListener(t,n,!1)})}catch(e){n=function(e,t,n){e.attachEvent("on"+t,n)}}return n}(),l=function(){function e(t){i(this,e),this.el=t,this.isSort=[],this.originSort=Array.prototype.slice.call(this.el.tBodies[0].children,0),this.theadEls=Array.prototype.slice.call(this.el.firstElementChild.children[0].children,0),this.init()}return r(e,[{key:s,value:function(e,t,n){var i=this,r=[],s=[],a=[];if(this.isSort[e])if(""===this.theadEls[e].getElementsByTagName("span")[0].firstChild.className){this.theadEls[e].getElementsByTagName("span")[0].firstChild.className="live",this.theadEls[e].getElementsByTagName("span")[0].lastChild.className="";for(var l=t.length-1;l>-1;l--){var o=t[l];this.el.tBodies[0].appendChild(o)}}else this.theadEls[e].getElementsByTagName("span")[0].firstChild.className="",this.theadEls[e].getElementsByTagName("span")[0].lastChild.className="",this.originSort.forEach(function(e){i.el.tBodies[0].appendChild(e)}),this.isSort[e]=!1;else{for(var c=0;c<this.isSort.length;c++)this.isSort[c]=!1;this.isSort[e]=!0;for(var h=0;h<t.length;h++){var d=t[h],u=d.children[e].textContent||d.children[e].innerText;isNaN(u)?u.charAt(0).charCodeAt()>255?r.push(d):s.push(d):a.push(d)}r.sort(function(t,n){var i=t.children[e].textContent||t.children[e].innerText,r=n.children[e].textContent||n.children[e].innerText;return i.localeCompare(r,"zh-Hans-CN",{sensitivity:"accent"})}),s.sort(function(t,n){var i=t.children[e].textContent||t.children[e].innerText,r=n.children[e].textContent||n.children[e].innerText;return i.localeCompare(r)}),a.sort(function(t,n){return(t.children[e].textContent||t.children[e].innerText)-(n.children[e].textContent||n.children[e].innerText)});[].concat(a,s,r).forEach(function(e){i.el.tBodies[0].appendChild(e)}),this.theadEls.forEach(function(e){e.getElementsByTagName("span")[0].lastChild.className="",e.getElementsByTagName("span")[0].firstChild.className=""}),this.theadEls[e].getElementsByTagName("span")[0].lastChild.className="live"}}},{key:"sortRow",value:function(e){var t=Array.prototype.slice.call(this.el.tBodies[0].children,0);this[s].call(this,e,t)}},{key:"init",value:function(){var e=this;this.el.tBodies[0].getElementsByTagName("td");if("THEAD"!==this.el.firstElementChild.nodeName)throw new Error("不存在表头，请设置表头");this.theadEls.forEach(function(t,n){console.log("yes",n);var i=e,r=t.childNodes;e.isSort.push(!1);var s=document.createElement("div");s.className="cell";var l=document.createElement("span"),o=document.createElement("i"),c=document.createElement("i");l.appendChild(o),l.appendChild(c);for(var h=0;h<r.length;h++){var d=r[h];s.appendChild(d)}s.appendChild(l),t.appendChild(s),a(t,"click",function(e){e.preventDefault(),console.log("点击",n),i.sortRow(n)})}),"first"===this.el.dataset.sort&&this.sortRow(0)}}]),e}(),o=t.Tables=function(){function e(t){i(this,e);var n=document.querySelectorAll(t);if(0===n.length)throw new Error("没有指定元素类名");this.tbs=Array.prototype.slice.call(n,0),this.tbsExtract=[],this.init()}return r(e,[{key:"init",value:function(){var e=this;this.tbs.forEach(function(t){-1===t.className.indexOf("table__sort")&&(t.className=t.className+" table__sort");var n=new l(t);e.tbsExtract.push(n)})}}]),e}();t.default=o},function(e,t){}])});