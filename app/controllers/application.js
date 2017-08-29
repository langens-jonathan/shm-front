import Ember from 'ember';

export default Ember.Controller.extend({
    init() {
	      // unfortunately necessary, otherwise the computed property doesn't fire properly
    	  Ember.get(this, 'commentsService.currentContext');
    },

    sessionService: Ember.inject.service("session"),

    commentsService: Ember.inject.service("comments"),

    contextService: Ember.inject.service("context"),

    loggedIn: Ember.computed('sessionService.loggedIn', function() {
	      return Ember.get(this, 'sessionService.loggedIn');
    }),

    toggleComment: false,

    displayComments: Ember.computed('loggedIn', 'toggleComment', 'sessionService.loggedIn', function () {
	      return Ember.get(this, 'loggedIn') && Ember.get(this, 'toggleComment');
    }),

    comments: Ember.computed.oneWay('commentsService.comments'),

    actions: {
	      logIn() {
	          Ember.get(this, 'sessionService.logIn')(Ember.get(this, 'sessionService'));
	      },

	      logOut() {
	          Ember.get(this,'sessionService.logOut')(Ember.get(this, 'sessionService'));
	      },

	      gotoRoute(route, title) {
	          Ember.set(this, 'pageTitle', title);
	          this.transitionToRoute(route);
	      },

	      newCommentFocusOut() {
	          var comment = Ember.get(this, 'newComment');
	          var addComment = Ember.get(this, 'commentsService.addComment');
	          addComment(comment, Ember.get(this, 'commentsService'));
	          Ember.set(this, 'newComment', '');

	          var recalculateComments = Ember.get(this, 'commentsService.recalculateComments');
	          recalculateComments(Ember.get(this, 'commentsService'));
	      },

	      newCommentKeyDown(val) {
	          if(Ember.get(val, "code") === "Enter") {
		            var comment = Ember.get(this, 'newComment');
		            var addComment = Ember.get(this, 'commentsService.addComment');
		            addComment(comment, Ember.get(this, 'commentsService'));
		            Ember.set(this, 'newComment', '');

		            var recalculateComments = Ember.get(this, 'commentsService.recalculateComments');
		            recalculateComments(Ember.get(this, 'commentsService'));
	          }
	      },

	      toggleComment() {
	          Ember.set(this, 'toggleComment', !Ember.get(this, 'toggleComment'));
	      }
    }
});
