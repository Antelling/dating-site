window.onload = () => {
  new Vue({
    el: "#application",
    data: {
      customAxios: axios.create({
        transformRequest:function(data) {var str = [];for(var p in data) {if (data.hasOwnProperty(p) && data[p]) {str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));}}console.log(str.join("&"));return str.join("&");},
        xsrfCookieName: "csrftoken",
        xsrfHeaderName: "X-CSRFToken",
        headers: { "Content-Type" : "application/x-www-form-urlencoded" }
      }),
      authentication: {
        error: null,
        key: "",
        csrf_token: "",
        register: {
          username: "",
          password1: "",
          password2: "",
          email: ""
        },
        login: {
          username: "",
          password: "",
          email: ""
        }
      }
    },
    mounted: function() {
      if (document.cookie != "") {
        this.authentication.key = document.cookie.slice(5);
      }
    },
    methods: {
      submitLogin: function() {
        if (this.authentication.login.username.length == 0 || this.authentication.login.password.length == 0 || this.authentication.login.email.length == 0) {
          this.authentication.error = "Please fill all fields."
          return;
        }
        this.customAxios({
          method: 'post',
          url: "http://datingapi.cloudapp.net/rest-auth/login/",
          data: this.authentication.login
        }).then(response => {
          this.authentication.error = null;
          this.authentication.key = response.data.key;
          document.cookie = "key=" + response.data.key;
          console.log("Authenticated. COokies set to: " + document.cookie);
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
        this.customAxios({
          method: 'post',
          url: "http://datingapi.cloudapp.net/rest-auth/registration",
          data: this.authentication.register
        }).then(response => {
          this.authentication.error = null;
          this.authentication.key = response.data.key;
          document.cookie = "key=" + response.data.key;
          alert("ran");
          console.log(response.headers);
          console.log("Authenticated. Cookies set to: " + document.cookie);
        }).catch(err => {
          this.handle("Error with registration. Please try again.")
        });
      },
      handle: function(err) {
        this.authentication.error = err;
      },
      test: function() {
        let config = {
          headers: {
            "Authorization": "Token 3422f2d6b7f2fc3f15e0132c1b90d5eba2b6f794"
          },
          xsrfCookieName: "XSRF-TOKEN",
          xsrfHeaderName: "X-XSRF-TOKEN"
        }
        axios.get("http://datingapi.cloudapp.net/personality_test/", config).then(response => {
          console.log(response);
          alert(response.data);
        }).catch(err => {
          alert(err.data);
        });
      }
    }
  })
}
