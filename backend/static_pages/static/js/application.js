window.onload = () => {
  Vue.component("personality-quiz", {
    template: "\
      <ul>\
      <li v-for='(item, index) in list'>\
      <p>{{index + 1}}. {{item}}</p>\
      <select><option value='1'>Very Inaccurate</option><option value='2'>Moderately Inaccurate</option><option value='3'>Neither Accurate nor Inaccurate</option><option value='4'>Moderately Accurate</option><option value='5'>Very Accurate</option></select>\
      </li>\
      </ul>\
    ",
    props: {
      list: Array
    }
  })
  new Vue({
    el: "#application",
    data: {
      customAxios: axios.create({
        // transform request injects the csrfmiddlwaretoken to every form and url encodes.
        transformRequest:function(data) {var str = [];data.csrfmiddlewaretoken=docCookies.getItem("XSRF-TOKEN");for(var p in data) {if (data.hasOwnProperty(p) && data[p]) {str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));}}return str.join("&");},
        headers: { "Content-Type" : "application/x-www-form-urlencoded" }
      }),
      user: {},
      baseUrl: "http://localhost/",
      questions: ["Am the life of the party.","Feel little concern for others.","Am always perpared.","Get stressed out easily.","Have a rich vocabulary.","Don't talk a lot.","Am interested in people.","Leave my belongings around.","Am relaxed most of the time.","Have difficulty understanding abstract ideas.","Feel comfortable around people.","Insult people.","Pay attention to details.","Worry about things.","Have a vivid imagination.","Keep in the backgroun.","Sympathize with others' feelings.","Make a mass of things.","Seldom feel blue.","Am not interested in abstract ideas.","Start conversations.","Am not interested in other people's problems.","Get chores done right away.","Am easily disturbed.","Have excellent ideas.","Have little to say.","Have a soft heart.","Often forget to put things back in their proper place.","Get upset easily.","Do not have a good imagination.","Talk to a lot of different people at parties.","Am not really interested in others.","Like order.","Change my mood a lot.","Am quick to understand things.","Don't like to draw attention to myself.","Take time out for others.","Shirk my duties.","Have frequent mood swings.","Use difficult words.","Don't mind being the center of attention.","Feel others' emotions.","Follow a schedule.","Get irritated easily.","Spend time reflecting on things.","Am quiet around strangers.","Make people feel at ease.","Am exacting in my work.","Often feel blue.","Am full of ideas."],
      answers: []
    },
    mounted: function() {
      this.getUserInformation();
    },
    methods: {
      getUserInformation: function() {
        this.customAxios.post(this.baseUrl + "api/auth/user_info/", {}).then(response => {
          this.user = response.data;
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
