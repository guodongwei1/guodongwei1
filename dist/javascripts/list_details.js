"use strict";

// 分頁器
$(function () {
  // pageselectCallback 页码选择的回调函数; 
  function pageselectCallback(page_index, jq) {
    // page_index : 页码，当前选择分页器的页码; 
    console.log(page_index);
    return false;
  } // 这个分页器的第一个参数是共有多少条数据; 
  // 分成多少页经过分页器内部的计算得出结果; 
  // 分页器内部可以设置当前一页显示多少条数据的配置选项; 


  $(".pagination").pagination(10, {
    // 选择页码之后会调用的函数; 
    callback: pageselectCallback,
    // 永远会显示第一页的选项按钮;
    num_edge_entries: 1,
    // 每页显示条数，这个会影响计算分页的数量; 
    items_per_page: 1,
    // 下一页按钮显示的内容 : 
    next_text: "<strong>下一页</strong>",
    prev_text: "<strong>上一页</strong>"
  });
}); // 渲染

$(function () {
  // 1. 页面之中所有内容的加载都是异步的; 
  // 2. 我们给元素添加事件的时候都是使用 事件委托实现的; 
  $.ajax({
    url: "../data/fenye.json"
  }).then(function (res) {
    render(res.datas);
  });

  function render(list) {
    $(".lis_cont").html(list.map(function (item) {
      return "<div class=\"lis_pro\">\n                   <div class=\"lis_img\">\n                    <img src=\"".concat(item.imges, "\" alt=\"\">\n                </div>\n                <p class=\"lis_info\">").concat(item.name, "</p>\n                <p class=\"lis_jia\">\n                    <span class=\"pro-unit\">\xA5</span>\n                    <span class=\"m-num\">").concat(item.price, "</span>\n                    <span class=\"pro-flag\">\u8D77</span>\n                    <span class=\"m-sale-tag\">\u7279\u4EF7</span>\n                </p>\n                </div> ");
    }).join(""));
  }
}); // 渲染結束
// 回到顶部

var ding_m = document.querySelector(".ding_m");

ding_m.onclick = function () {
  scrollTo({
    top: 0,
    //    缓慢向上
    behavior: 'smooth'
  });
}; // 回到顶部结束