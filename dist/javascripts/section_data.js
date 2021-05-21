"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// AJAX封装
var xhr = function xhr(type, url, callback) {
  var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (_typeof(data) === "object" && data !== null && !(data instanceof Array)) {
    var temp = "";

    for (var attr in data) {
      temp += "&".concat(attr, "=").concat(data[attr]);
    }

    data += temp.slice(1);
  }

  if (type === "GET" && typeof data === "string") {
    url += "?" + data;
  }

  var xhr = new XMLHttpRequest();
  xhr.open(type, url);

  if (type === "POST" && typeof data === "string") {
    xhr.send(data);
  } else {
    xhr.send();
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr.responseText);
    }
  };
}; // 课程展示部分


xhr("GET", "https://api.gogoup.com/p1/data/recommend?type=0&pageNo=4&pageSize=5&fromId=1193&jsonpcallback=callback", function (res) {
  console.log(res);
});