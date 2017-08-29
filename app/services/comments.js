import Ember from 'ember';

export default Ember.Service.extend({
    contextService: Ember.inject.service('context'),

    store: Ember.inject.service(),

    currentContext: Ember.computed.oneWay('contextService.context'),

    comments: [],

    updateComments: Ember.observer('currentContext', function() {
	      Ember.get(this, 'recalculateComments')(this);
    }),

    recalculateComments(__this=this) {
	      var store = Ember.get(__this, 'store');
	      var currentContext = Ember.get(__this, 'currentContext');

	      if(currentContext === undefined) {
	          return;
	      }

	      var commentsPromise = store.query('comment', {
	          filter: {
		            context: currentContext
	          }
	      });

	      commentsPromise.then((function(_this) {
	          return function(results) {
		            Ember.set(_this, 'comments', results);
	          };
	      })(__this));
    },

    addComment(comment, _this=this) {
        if(comment.trim() === "") {
            return;
        }
	      var context = Ember.get(_this, 'currentContext');
	      var store = Ember.get(_this, 'store');

	      var newComment = store.createRecord('comment', {
	          content: comment,
	          context: context
	      });

	      newComment.save().then(function(result) {
	          Ember.Logger.log(result);
	      });
    }
});
