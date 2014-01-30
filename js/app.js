App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.resource('posts');
  this.resource('post', { path: '/posts/:post_id' }, function() {
    this.resource('comments', function() {
      this.route('new');
      this.route('create');
    });
    this.route('comment', { path: 'comments/:comment_id'});
  });
});

App.PostsRoute=Ember.Route.extend({
  model: function(){
    return App.Post.find();
  }
});

App.PostIndexRoute=Ember.Route.extend({
  model: function(params) {
    return this.modelFor('post');
  }
});

App.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.FixtureAdapter'
});

App.Post=DS.Model.extend({
  comments: DS.hasMany('App.Comment'),
  title: DS.attr('string')
});

App.Post.FIXTURES=[{ id: "1", title: "First Post", comments: [1, 2, 3] },
                  { id: "2", title: "Second Post", comments: [4, 5, 6] },
                  { id: "3", title: "Third Post", comments: [7, 8, 9] }];

App.Comment = DS.Model.extend({
  post: DS.belongsTo('App.Post'),
  text: DS.attr('string')
});

App.Comment.FIXTURES = [{id:"1", text: "First Comment"},
                        {id:"2", text: "Second Comment"},
                        {id:"3", text: "Third Comment"},
                        {id:"4", text: "Fourth Comment"},
                        {id:"5", text: "Fifth Comment"},
                        {id:"6", text: "Sixth Comment"},
                        {id:"7", text: "Seventh Comment"},
                        {id:"8", text: "Eighth Comment"},
                        {id:"9", text: "Ninth Comment"}];
