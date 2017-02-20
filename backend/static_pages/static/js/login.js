window.onload = () => {
  new Vue({
    el: "#application",
    data: {
      customAxios: axios.create({
        transformRequest:function(data) {var str = [];data.csrfmiddlewaretoken=docCookies.getItem("XSRF-TOKEN");for(var p in data) {if (data.hasOwnProperty(p) && data[p]) {str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));}}return str.join("&");},
        headers: { "Content-Type" : "application/x-www-form-urlencoded" }
      }),
      authentication: {
        error: null,
        key: "",
        register: {username: "",password: "",email: "", first_name: "", last_name: "", location: "", age: ""},
        login: {username: "",password: "",email: ""},
        displayLogin: true
      },
      baseUrl: "http://localhost/"
    },
    methods: {
      submitLogin: function() {
        if (this.authentication.login.username.length == 0 || this.authentication.login.password.length == 0 || this.authentication.login.email.length == 0) {
          this.authentication.error = "Please fill all fields."
          return;
        }
        this.customAxios({
          method: 'post',
          url: this.baseUrl + "api/auth/login/",
          data: this.authentication.login
        }).then(response => {
          this.authentication.error = null;
          console.log(response);
          // window.location = "/static/dashboard.html"
        }).catch(err => {
          console.log(err);
          this.handle("Error with authenticating. Please try again.")
        });
      },
      submitRegister: function() {
        if (this.authentication.register.username.length == 0 || this.authentication.register.password.length == 0
          || this.authentication.register.email.length == 0 || this.authentication.register.first_name.length == 0
          || this.authentication.register.last_name.length == 0 || this.authentication.register.location == ""
          || this.authentication.register.age == "") {
          this.authentication.error = "Please fill all fields."
          return;
        }
        this.customAxios({
          method: 'post',
          url: this.baseUrl + "api/auth/registration",
          data: this.authentication.register
        }).then(response => {
          this.authentication.error = null;
        }).catch(err => {
          console.log(err);
          this.handle("Error with registration. Please try again.")
        });
      },
      handle: function(err) {
        this.authentication.error = err;
      }
    }
  })
}
