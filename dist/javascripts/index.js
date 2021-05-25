"use strict";

//  轮播图开始
//获取元素
var next_ele = document.querySelector(".next_button");
var prev_ele = document.querySelector(".prev_button");
var pagination_ele = document.querySelectorAll(".pagination_a span");
var wrapper_ele = document.querySelector(".wrapper");
var box = document.querySelector(".banner_box"); //初始索引

var index = 0; //绑定事件

next_ele.onclick = function () {
  if (index === 6) {
    index = 1;
    wrapper_ele.style.left = 0;
  } else {
    index++;
  } // console.log(index);


  pager();
};

prev_ele.onclick = function () {
  if (index === 0) {
    index = 6;
    wrapper_ele.style.left = -6027 + "px";
  } else {
    index--;
  } // console.log(index);


  pager();
}; //分页器遍历划过事件


var _loop = function _loop(i) {
  pagination_ele[i].onmouseout = function () {
    //解决鼠标停留在一个地方的BUG 
    if (index === i) {
      return false;
    }

    index = i; // console.log(index);

    pager();
  };
};

for (var i = 0; i < pagination_ele.length; i++) {
  _loop(i);
} //函数 分页器索引清空


function pager() {
  for (var _i = 0; _i < pagination_ele.length; _i++) {
    pagination_ele[_i].className = "";
  }

  pagination_ele[index === 6 ? 0 : index].className = "active";
  move(wrapper_ele, "left", -index * 859);
} //开启定时器


var t = setInterval(function () {
  //自动播放模拟事件 dispatchEvent是API
  next_ele.dispatchEvent(new Event("click"));
}, 3300); //鼠标移入就终止执行

box.onmouseover = function () {
  clearInterval(t);
}; //移出就开启


box.onmouseout = function () {
  t = setInterval(function () {
    next_ele.dispatchEvent(new Event("click"));
  }, 3300);
}; //  轮播图结束
// body轮播
//第一个轮播


var wrapper_m = document.querySelector(".wrapper_m");
var btn_you = document.querySelector(".you_btn");
var btn_zou = document.querySelector(".zou_btn");
var index_m = 0; //鼠标点击事件

btn_you.onclick = function () {
  if (index_m === 4) {
    return;
  } else {
    index_m++;
  }

  xaio_guo();
};

btn_zou.onclick = function () {
  if (index_m === 0) {
    return;
  } else {
    index_m--;
  }

  xaio_guo();
};

function xaio_guo() {
  move(wrapper_m, "left", -index_m * 271);
} //第一个轮播结束
//第二个轮播


var wrapper_tow = document.querySelector(".wrapper_tow");
var you_tow = document.querySelector(".you_tow");
var zou_tow = document.querySelector(".zou_tow");
var index_t = 0; //鼠标点击事件

you_tow.onclick = function () {
  if (index_t === 4) {
    return;
  } else {
    index_t++;
  }

  tow_m();
};

zou_tow.onclick = function () {
  if (index_m === 0) {
    return;
  } else {
    index_t--;
  }

  tow_m();
};

function tow_m() {
  move(wrapper_tow, "left", -index_t * 271);
} //第二个轮播结束
//倒计时


function asa() {
  var a = new Date('2021/08/21 23:00:00');
  var r = a.getTime() - Date.now();
  var s = parseInt(r / 1000 % 60); // 不满60的秒数; 

  var m = parseInt(r / 1000 / 60 % 60); // 不足60 的分钟数; 

  var h = parseInt(r / 1000 / 60 / 60 % 24); // 不足24 的小时数; 

  var d = parseInt(r / 1000 / 60 / 60 / 24); // 剩余的天数; 

  if (s < 10) {
    s = '' + 0 + s;
  }

  if (m < 10) {
    m = '' + 0 + m;
  }

  if (h < 10) {
    h = '' + 0 + h;
  }

  var html = "<span class=\"p1\">".concat(h, "</span>\n                <span class=\"m\">:</span>\n                <span class=\"p1\">").concat(m, "</span>\n                <span class=\"m\">:</span>\n                <span class=\"p1\">").concat(s, "</span>");
  sj.innerHTML = html;
}

setInterval(asa, 1000);
asa(); //倒计时结束
// 渲染

$(function () {
  // 1. 页面之中所有内容的加载都是异步的; 
  // 2. 我们给元素添加事件的时候都是使用 事件委托实现的; 
  $.ajax({
    url: "../data/data.json"
  }).then(function (res) {
    render(res.datas);
  });

  function render(list) {
    $(".sub_cont").html(list.map(function (item) {
      return "\n                <div class=\"details\">\n                        <p class=\"ipc\"><img src=\"".concat(item.pic_url, "\" alt=\"\"></p>\n                        <span class=\"name_m\">").concat(item.attr_ext.custom_summary, "</span>\n                        <div class=\"bot\">\n                        <p class=\"pro-info\">").concat(item.name, "</p>\n                        <p class=\"pro-price\">\n                        <span class=\"pro-unit\">\xA5</span>\n                        <span class=\"m-num\">").concat(item.price / 100, "</span>\n                        </div>\n                    </p>\n                </div>\n            ");
    }).join(""));
  }
}); //渲染结束
// 回到顶部

var ding_m = document.querySelector(".ding_m");

ding_m.onclick = function () {
  scrollTo({
    top: 0,
    //    缓慢向上
    behavior: 'smooth'
  });
}; // 回到顶部结束