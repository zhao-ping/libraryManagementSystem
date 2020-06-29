"use strict";

var app = new Vue({
  el: "#app",
  data: function data() {
    return {
      list: null
    };
  },
  methods: {
    getList: function getList() {
      var _this = this;

      getData('/admin/book/type/list', this, {
        formData: this.formData
      }).then(function (r) {
        _this.list = r;
      });
    }
  },
  created: function created() {
    this.getList();
  },
  mounted: function mounted() {}
});