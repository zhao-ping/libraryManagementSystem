"use strict";

var app = new Vue({
  el: "#app",
  data: function data() {
    return {
      book_types: [],
      formData: {
        book_name: null,
        book_author: null,
        book_price: 50,
        book_type_id: 1,
        book_count: 1,
        admin_id: 1
      }
    };
  },
  methods: {
    getBookTypes: function getBookTypes() {
      var _this = this;

      getData('/book/type/list', this, {
        formData: this.formData
      }).then(function (r) {
        _this.book_types = r;
      });
    },
    newBook: function newBook() {
      var _this2 = this;

      getData('/book/new', this, {
        method: "post",
        formData: this.formData
      }).then(function (r) {
        _this2.$toast("新书入库成功");
      });
    }
  },
  created: function created() {
    this.getBookTypes();
  },
  mounted: function mounted() {}
});