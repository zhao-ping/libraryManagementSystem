"use strict";

Vue.component('pager', {
  props: ['totalPage', 'page'],
  data: function data() {
    return {
      pages: []
    };
  },
  watch: {
    totalPage: function totalPage() {
      console.log(99);
      this.pages = [];

      if (page - 1 > 0) {
        this.pages.push({
          k: "首页",
          v: 1
        });
        this.pages.push({
          k: "上一页",
          v: this.page - 1
        });
      }

      for (var i = page - 2; i < page + 2; i++) {
        if (i > 0 && i < this.totalPage) {
          this.pages.push({
            k: i,
            v: i
          });
        }
      }

      if (page + 1 < this.totalPage) {
        this.pages.push({
          k: "下一页",
          v: this.page + 1
        });
        this.pages.push({
          k: "尾页",
          v: this.totalPage
        });
      }
    }
  },
  template: "\n    <section class=\"pager\">\n        <span class=\"page\">\u9996\u9875</span>\n        <span class=\"page\">\u4E0A\u4E00\u9875</span>\n        <span class=\"page\">1</span>\n        <span class=\"page\">2</span>\n        <span class=\"page\">3</span>\n        <span class=\"page\">4</span>\n        <span class=\"page\">5</span>\n        <span class=\"page\">\u4E0B\u4E00\u9875</span>\n        <span class=\"page\">\u5C3E\u9875</span>\n    </section>\n    ",
  methods: {}
});