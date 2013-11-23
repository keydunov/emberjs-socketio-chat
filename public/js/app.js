App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});


Ember.MessagesArray = Ember.ArrayProxy.extend({
  init: function() {
    var messages = Ember.A(['red', 'yellow', 'blue']);
    this.set("content", messages);

    // this.socket.on

    this._super();
  }
});

window.messages = Ember.MessagesArray.create();

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return window.messages;
  }
});
