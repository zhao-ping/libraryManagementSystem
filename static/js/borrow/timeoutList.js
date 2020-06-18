"use strict";

var app = new Vue({
  el: "#app",
  data: function data() {
    return {
      formData: {
        book_name: null,
        student_id: null,
        page: 1
      },
      pager: null,
      list: null,
      currentIndex: 0,
      borrowInfo: null
    };
  },
  methods: {
    downLoad: function downLoad() {
      var pdfEl = document.getElementById("borrowInfo");
      var option = {
        margin: 2,
        filename: "催还单据.pdf",
        image: {
          type: 'jpeg',
          quality: 0.98
        },
        html2canvas: {
          scale: 2
        },
        jsPDF: {
          unit: 'in',
          format: 'letter',
          orientation: 'portrait'
        }
      };
      html2pdf().from(pdfEl).to("pdf").save();
    },
    outTime: function outTime(time) {
      var outTime = Math.round(new Date() / 1000) - time;
      var days = outTime / (60 * 60 * 24);
      days = Math.ceil(days);
      return days;
    },
    showBorrowInfo: function showBorrowInfo(item, index) {
      this.borrowInfo = item;
      this.currentIndex = index;
      this.$refs["pop-borrow"].show();
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
      var _this = this;

      getData('/borrow/list/timeout', this, {
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