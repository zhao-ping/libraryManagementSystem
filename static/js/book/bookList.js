"use strict";

var app = new Vue({
  el: "#app",
  data: function data() {
    return {
      formData: {
        book_id: null,
        book_name: null,
        page: 1
      },
      pager: null,
      list: null,
      currentBookIndex: 0,
      borrowInfo: {
        student_id: null,
        borrow_days: 30,
        book_id: null
      }
    };
  },
  methods: {
    showBorrowBook: function showBorrowBook(bookIndex) {
      this.currentBookIndex = bookIndex;
      this.$refs["popupBorrow"].show();
    },
    borrowBook: function borrowBook() {
      var _this = this;

      if (!this.borrowInfo.student_id) {
        this.$toast("请输入学号！");
        return;
      }

      this.borrowInfo.book_id = this.list[this.currentBookIndex].book_id;
      var formData = this.borrowInfo;
      getData("/admin/borrow", this, {
        method: "post",
        formData: formData
      }).then(function (r) {
        _this.$toast("图书借出成功！");

        _this.list[_this.currentBookIndex].borrow_state = 1;

        _this.$refs["popupBorrow"].hide();
      });
    },
    deletBook: function deletBook(book, bookIndex) {
      var _this2 = this;

      this.$confirm("\u786E\u8BA4\u5C06ID\u4E3A".concat(book.book_id, "\uFF0C\u540D\u79F0\u4E3A\u300A").concat(book.book_name, "\u300B\u7684\u4E66\u7C4D\u4E0B\u67B6\u5417\uFF1F")).then(function () {
        console.log("删除书籍");
        var formData = {
          book_id: book.book_id
        };
        getData("/admin/book/delete", _this2, {
          method: "delete",
          formData: formData
        }).then(function (r) {
          _this2.list[bookIndex].delete_state = 1;
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
      var _this3 = this;

      getData('/admin/book/list', this, {
        formData: this.formData
      }).then(function (r) {
        _this3.list = r.list;
        _this3.pager = r.pager;
      });
    }
  },
  created: function created() {
    this.getList();
  },
  mounted: function mounted() {}
});