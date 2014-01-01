App = Ember.Application.create();

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

App.ScrollingDivComponent = Ember.Component.extend({
  scheduleScrollIntoView: function() {
    // Only run once per tick, once rendering has completed;
    // avoid flood of scrolls when many updates happen at once
    Ember.run.scheduleOnce("afterRender", this, "scrollIntoView");
  }.observes("update-when.@each"),

  scrollIntoView: function() {
    this.$().scrollTop(this.$().prop("scrollHeight"));
  }
});
