import Ember from 'ember';

export default Ember.Service.extend({
    loggedIn: false,

    logIn(_this) {
	Ember.set(_this, 'loggedIn', true);
    },

    logOut(_this) {
	Ember.set(_this, 'loggedIn', false);
    }
});
