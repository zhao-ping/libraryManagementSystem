"use strict";

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

      getData("/admin/chart/borrow_type", this).then(function (r) {
        _this.info = r;

        _this.paintChart();
      });
    },
    paintChart: function paintChart() {
      var data = [];
      this.info.map(function (item) {
        data.push({
          title: item.book_type_name,
          num: item.count
        });
      });
      this.info;
      var pieDatas = {
        title: "借阅书籍类型比例环形图",
        defalutIndex: 0,
        type: "circle",
        data: data,
        callback: function callback(i) {
          console.log(i);
        }
      };
      new pieChart("circleChart", pieDatas);
    }
  },
  created: function created() {},
  mounted: function mounted() {
    this.getInfo();
  }
});