"use strict";

var app = new Vue({
  el: "#app",
  data: function data() {
    return {
      formData: {
        admin_name: null,
        password: null
      }
    };
  },
  methods: {
    login: function login() {
      var formData = this.formData;
      getData("/login", this, {
        formData: formData,
        method: "post"
      }).then(function (r) {
        setCookie("admin", r);
        location.href = "/";
      });
    }
  }
});