"use strict";

// 多属性运动框架
function move(dom, attr, target) {
  // 我们对于透明度的处理是让透明度的值扩大100倍; 
  if (attr === "opacity") {
    var now_attr = parseInt(getComputedStyle(dom)[attr] * 100); //  now_attr : 100 

    target *= 100; // target : 30 
  } else {
    var now_attr = parseInt(getComputedStyle(dom)[attr]);
  }

  clearInterval(dom.t);
  dom.t = setInterval(function () {
    var speed = (target - now_attr) / 10;
    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

    if (target === now_attr) {
      clearInterval(dom.t);
    } else {
      now_attr += speed; // 判断透明度还有普通的属性; 

      if (attr === "opacity") {
        dom.style[attr] = now_attr / 100;
      } else {
        dom.style[attr] = now_attr + "px";
      }
    }
  }, 50);
}