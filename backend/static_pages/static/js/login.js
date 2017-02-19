window.onload = () => {
  new Vue({
    el: "#application",
    data: {
      customAxios: axios.create({
        transformRequest:function(data) {var str = [];for(var p in data) {if (data.hasOwnProperty(p) && data[p]) {str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));}}console.log(str.join("&"));return str.join("&");},
        headers: { "Content-Type" : "application/x-www-form-urlencoded" }
      }),
      authentication: {
        error: null,
        key: "",
        csrf_token: "",
        register: {username: "",password1: "",password2: "",email: ""},
        login: {username: "",password: "",email: ""},
        displayLogin: true
      },
      user: {
        username: ""
      },
      baseUrl: "http://localhost/"
    },
    methods: {
      submitLogin: function() {
        if (this.authentication.login.username.length == 0 || this.authentication.login.password.length == 0 || this.authentication.login.email.length == 0) {
          this.authentication.error = "Please fill all fields."
          return;
        }
        this.authentication.login.csrfmiddlewaretoken = docCookies.getItem("XSRF-TOKEN")
        this.customAxios({
          method: 'post',
          url: this.baseUrl + "rest-auth/login/",
          data: this.authentication.login
        }).then(response => {
          this.authentication.error = null;
          console.log(response);
          // window.location = "/static/dashboard.html"
        }).catch(err => {
          this.handle("Error with authenticating. Please try again.")
        });
      },
      submitRegister: function() {
        if (this.authentication.register.username.length == 0 || this.authentication.register.password1.length == 0
          || this.authentication.register.password2.length == 0 || this.authentication.register.email.length == 0) {
          this.authentication.error = "Please fill all fields."
          return;
        }
        this.authentication.register.csrfmiddlewaretoken = docCookies.getItem("XSRF-TOKEN")
        this.customAxios({
          method: 'post',
          url: this.baseUrl + "rest-auth/registration",
          data: this.authentication.register
        }).then(response => {
          this.authentication.error = null;
        }).catch(err => {
          this.handle("Error with registration. Please try again.")
        });
      },
      handle: function(err) {
        this.authentication.error = err;
      }
    }
  })
}
