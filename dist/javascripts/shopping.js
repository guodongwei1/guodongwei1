"use strict";

window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      items: [{
        id: 1,
        name: "Redmi AirDots 3真无线蓝牙耳机 元气粉",
        price: 799.00,
        count: 1,
        url: "https://img.youpin.mi-img.com/shopmain/14e12b39b3c2ffd9e23291c9fbd2d28e.png"
      }],
      search: ""
    },
    methods: {},
    filters: {
      //过滤器
      numFilter: function numFilter(data, n) {
        //data==item.price 当前过滤的数据 n==2
        return "￥" + data.toFixed(n);
      }
    },
    computed: {
      //计算属性
      totalCount: function totalCount() {
        var n = 0;
        this.items.forEach(function (v, i) {
          n += v.count;
        });
        return n;
      },
      totalPrice: function totalPrice() {
        var money = 0;
        this.items.forEach(function (v, i) {
          money += v.count * v.price;
        });
        return money;
      },
      searchFor: function searchFor() {
        var _this = this;

        if (!this.search) {
          return this.items;
        }

        return this.items.filter(function (v, i) {
          if (v.name.indexOf(_this.search) !== -1) {
            //匹配成功
            return v;
          }
        });
      }
    }
  });
}; // 回到顶部


var ding_m = document.querySelector(".ding_m");

ding_m.onclick = function () {
  scrollTo({
    top: 0,
    //    缓慢向上
    behavior: 'smooth'
  });
}; // 回到顶部结束