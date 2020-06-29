"use strict";

var app = new Vue({
  el: "#app",
  data: function data() {
    return {
      formData: {
        student_id: null,
        student_name: null,
        page: 1
      },
      pager: null,
      list: null
    };
  },
  methods: {
    reset: function reset() {
      this.formData.student_id = null;
      this.formData.student_name = null;
      this.research();
    },
    research: function research(i) {
      this.formData.page = i || 1;
      this.getList();
    },
    getList: function getList() {
      var _this = this;

      getData('/admin/student/list', this, {
        formData: this.formData
      }).then(function (r) {
        _this.list = r.list;
        _this.pager = r.pager;
      });
    }
  },
  created: function created() {
    this.getList();
  },
  mounted: function mounted() {}
});