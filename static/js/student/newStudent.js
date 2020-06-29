"use strict";

var app = new Vue({
  el: "#app",
  data: function data() {
    return {
      formData: {
        student_name: null,
        student_grade: 1,
        student_major: "计算机科学与技术",
        student_age: 18,
        student_sex: 0
      }
    };
  },
  methods: {
    newStudent: function newStudent() {
      var _this = this;

      getData('/admin/student/new', this, {
        method: "post",
        formData: this.formData
      }).then(function (r) {
        _this.$toast("新生入库成功");
      });
    }
  },
  created: function created() {},
  mounted: function mounted() {}
});