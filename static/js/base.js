"use strict";

axios.defaults.baseURL = 'http://localhost:8080/api/';
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

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
        data: formData,
        params: formData
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
  },
  $confirm: function $confirm(msg) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$title = _ref2.title,
        title = _ref2$title === void 0 ? "提示" : _ref2$title,
        _ref2$message = _ref2.message,
        message = _ref2$message === void 0 ? "这里是提示！" : _ref2$message;

    return new Promise(function (resolve, reject) {
      if (typeof msg == "string") {
        message = msg;
      }

      var confirm = document.createElement("div");
      confirm.className = "modal";
      confirm.innerHTML = "<div id=\"confirmBg\" class=\"bg\"></div>\n            <div class=\"contianer confirm bg-white text-center br-5\">\n                <section class=\"p-30\">\n                    <div class=\"pb-20 text-20\"><b>".concat(title, "</b></div>\n                    <p class=\"line-h-28 text-16 color-grey\">").concat(message, "</p>\n                </section>\n                <div class=\"p-10 ub ub-ac\">\n                    <div id=\"cancel\" class=\"btn grey ub-f1 mr-15\">\u53D6\u6D88</div>\n                    <div id=\"confirm\" class=\"btn ub-f1\">\u786E\u5B9A</div>\n                </div>\n            </div>");
      document.body.appendChild(confirm);

      document.getElementById("cancel").onclick = function () {
        document.body.removeChild(confirm);
      };

      document.getElementById("confirmBg").onclick = function () {
        document.body.removeChild(confirm);
      };

      document.getElementById("confirm").onclick = function () {
        document.body.removeChild(confirm);
        resolve("confirm");
      };
    });
  }
};
Object.assign(Vue.prototype, vueExtends);