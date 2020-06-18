"use strict";

var app = new Vue({
  el: "#app",
  data: function data() {
    return {
      formData: {
        book_id: null,
        book_name: null,
        student_id: null,
        page: 1
      },
      pager: null,
      list: null
    };
  },
  methods: {
    backBook: function backBook(borrow, bookIndex) {
      var _this = this;

      this.$confirm("\u786E\u8BA4\u5B66\u751F ".concat(borrow.student_name, " \u5F52\u8FD8\u4E66\u7C4D\u300A").concat(borrow.book_name, "\u300B!")).then(function (r) {
        var formData = {
          borrow_id: borrow.borrow_id
        };
        getData("/borrow/back", _this, {
          method: "put",
          formData: formData
        }).then(function (r) {
          _this.list[bookIndex].borrow_state = 0;
        });
      });
    },
    reset: function reset() {
      this.formData.book_id = null;
      this.formData.book_name = null;
      this.research();
    },
    research: function research(i) {
      this.formData.page = i || 1;
      this.getList();
    },
    getList: function getList() {
      var _this2 = this;

      getData('/borrow/list', this, {
        formData: this.formData
      }).then(function (r) {
        _this2.list = r.list;
        _this2.pager = r.pager;
      });
    }
  },
  created: function created() {
    this.getList();
  },
  mounted: function mounted() {}
});