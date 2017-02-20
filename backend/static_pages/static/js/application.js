window.onload = () => {
  new Vue({
    el: "#application",
    data: {
      customAxios: axios.create({
        // transform request injects the csrfmiddlwaretoken to every form and url encodes.
        transformRequest:function(data) {var str = [];data.csrfmiddlewaretoken=docCookies.getItem("XSRF-TOKEN");for(var p in data) {if (data.hasOwnProperty(p) && data[p]) {str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));}}return str.join("&");},
        headers: { "Content-Type" : "application/x-www-form-urlencoded" }
      }),
      user: {
        username: "",
        email: ""
      },
      baseUrl: "http://localhost/"
    },
    mounted: function() {
      this.getUserInformation();
    },
    methods: {
      getUserInformation: function() {
        this.customAxios.post(this.baseUrl + "api/auth/user_info/", {}).then(response => {
          this.user.username = response.data.username;
          this.user.email = response.data.email;
        })
      },
      logOut: function() {
        this.customAxios.post(this.baseUrl + "api/auth/logout/", {}).then(() => {
          window.location = this.baseUrl;
        }).catch(err => {
          window.location = this.baseUrl;
        });
      },
      handle: function(err) {
        this.authentication.error = err;
      }
    }
  })
}
