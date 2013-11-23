App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});


Ember.MessagesArray = Ember.ArrayProxy.extend({
  init: function() {
    var messages = Ember.A();
    this.set("content", messages);

    this.socket.on("message", function(data) {
      messages.pushObject(data.message);
    });

    this._super();
  },
  replaceContent: function(ids, amt, object) {
   this.socket.emit("send", { message: object });
  }
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return Ember.MessagesArray.create({ socket: io.connect("http://localhost") });
  }
});

App.IndexController = Ember.ArrayController.extend({
  msg: "",
  actions: {
    sendMessage: function() {
      this.pushObject(this.get("msg"));
      this.set("msg", "");
    }
  }
});
