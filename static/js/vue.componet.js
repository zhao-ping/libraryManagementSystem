"use strict";

Vue.component('pager', {
  props: ['pageCount', 'page'],
  data: function data() {
    return {
      pages: []
    };
  },
  watch: {
    page: function page() {
      this.resetPager();
    }
  },
  template: "\n    <section class=\"pager\">\n        <span v-for=\"item in pages\" @click=\"toPage(item.v)\" class=\"page\" :class=\"{'bg-purple-1':page==item.v}\" v-text=\"item.k\"></span>\n    </section>\n    ",
  methods: {
    toPage: function toPage(page) {
      this.$emit("change", page);
    },
    resetPager: function resetPager() {
      this.pages = [];

      if (this.page - 1 > 0) {
        this.pages.push({
          k: "首页",
          v: 1
        });
        this.pages.push({
          k: "上一页",
          v: this.page - 1
        });
      }

      for (var i = this.page - 2; i <= this.page + 2; i++) {
        if (i > 0 && i <= this.pageCount) {
          this.pages.push({
            k: i,
            v: i
          });
        }
      }

      if (this.page + 1 <= this.pageCount) {
        this.pages.push({
          k: "下一页",
          v: this.page + 1
        });
        this.pages.push({
          k: "尾页",
          v: this.pageCount
        });
      }
    }
  },
  created: function created() {
    this.resetPager();
  }
});
Vue.component("popup", {
  props: [],
  data: function data() {
    return {
      isShow: false
    };
  },
  template: "\n    <div v-show=\"isShow\" class=\"modal\">\n        <div @click=\"hide\" class=\"bg\"></div>\n        <div class=\"contianer bg-white br-5\">\n            <slot></slot>\n        </div>\n    </div>\n    ",
  methods: {
    show: function show() {
      this.isShow = true;
    },
    hide: function hide() {
      this.isShow = false;
    }
  }
});