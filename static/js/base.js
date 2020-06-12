"use strict";

axios.defaults.baseURL = 'http://localhost:8080/api/';
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

function getData(url, t) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$method = _ref.method,
      method = _ref$method === void 0 ? "get" : _ref$method,
      _ref$formData = _ref.formData,
      formData = _ref$formData === void 0 ? {} : _ref$formData,
      list = _ref.list,
      resData = _ref.resData;

  return new Promise(function (resolve, reject) {
    try {
      axios.request(url, {
        method: method,
        data: method.toLowerCase() != "get" ? JSON.stringify(formData) : null,
        params: method.toLowerCase() == "get" ? formData : null
      }).then(function (r) {
        var res = r.data;

        if (res.code == 0) {
          resolve(res.data);
        } else if (res.code == 1) {
          t.$toast(res.msg);
        }
      })["catch"](function (error) {
        if (error.message.indexOf("timeout") != -1) {
          t.$toast("请求超时，请重复此操作或者刷新页面！");
        }
      });
    } catch (error) {
      t.$toast("网络请求出错");
      reject();
    }
  });
}

var vueExtends = {
  formateDateTime: function formateDateTime(time) {
    var dateTime = new Date(time * 1000);
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    return "".concat(year, "-").concat(month, "-").concat(day);
  },
  $toast: function $toast(msg) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
    var toast = document.createElement('div');
    toast.innerText = msg;
    toast.className = "toast";
    document.body.append(toast);
    var timer = 300,
        everyTimer = 5,
        stepOpacity = 1 / timer * everyTimer;
    var opacity = 0;
    var showInterval = setInterval(function () {
      opacity += stepOpacity;

      if (opacity <= 1) {
        toast.style.opacity = opacity;
      } else {
        clearInterval(showInterval);
      }
    }, everyTimer);
    setTimeout(function () {
      var hideInterval = setInterval(function () {
        opacity -= stepOpacity;

        if (opacity >= 0) {
          toast.style.opacity = opacity;
        } else {
          clearInterval(hideInterval);
          document.body.removeChild(toast);
        }
      }, everyTimer);
    }, duration);
  }
};
Object.assign(Vue.prototype, vueExtends);