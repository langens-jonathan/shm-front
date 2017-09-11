import Ember from 'ember';

export default Ember.Mixin.create({
    context: "general",

    contextService: Ember.inject.service("context"),

    // contextObserver: Ember.observer('context', function() {
    //     var context = Ember.get(this, 'context');
    //     Ember.get(this, 'activate')();
    // }),

    activate() {
	      var changeContext = Ember.get(this, 'contextService.changeContext');
	      var context = Ember.get(this, 'context');

	      changeContext(context, Ember.get(this, 'contextService'));
    }
});
