"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var app = new Vue({
  el: "#app",
  data: function data() {
    return {
      info: null
    };
  },
  methods: {
    getInfo: function getInfo() {
      var _this = this;

      getData("/admin/chart/borrow_time", this).then(function (r) {
        _this.info = r;

        _this.paintChart();
      });
    },
    paintChart: function paintChart() {
      var series = [];
      var xAxis = [];
      this.info.a_axis.map(function (item) {
        xAxis.push(vueExtends.formateDateTime(item));
      });
      this.info.series.map(function (item) {
        var ser = _objectSpread({
          type: 'area'
        }, item);

        series.push(ser);
      });
      var chartOptionArea = {
        title: "最受欢迎的图书近7天借阅情况",
        xAxis: {
          data: xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: series
      };
      new barChart("chart", chartOptionArea);
    }
  },
  created: function created() {},
  mounted: function mounted() {
    this.getInfo();
  }
});