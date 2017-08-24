import Ember from 'ember';

export default Ember.Controller.extend({    
    sessionService: Ember.inject.service("session"),

    _loggedIn: true,

    loggedIn: Ember.computed('_loggedIn', function() {
    	return Ember.get(this, '_loggedIn');
    }),

    actions: {
	logIn() {
	    Ember.set(this, "_loggedIn", true);
	},

	logOut() {
	    Ember.set(this, "_loggedIn", false);
	}
    }
});
