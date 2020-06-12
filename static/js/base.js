"use strict";

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
      axios.request("".concat(location.origin, "/v1/api/").concat(url), {
        method: method,
        data: method.toLowerCase() != "get" ? JSON.stringify(formData) : null,
        params: method.toLowerCase() == "get" ? formData : null
      }).then(function (r) {
        var res = r.data;
        resolve(res);
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