"use strict";

var app = new Vue({
  el: "#app",
  data: function data() {
    return {
      formData: {
        student_id: null,
        student_name: null
      },
      pager: null,
      list: null
    };
  },
  created: function created() {
    var _this = this;

    getData('/student/list', this, {
      formData: this.formData
    }).then(function (r) {
      _this.list = r.list;
      _this.pager = r.pager;
    });
  },
  mounted: function mounted() {
    var time = vueExtends.formateDateTime(1591943058);
    console.log(time);
  }
});