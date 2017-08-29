import Ember from 'ember';

export default Ember.Service.extend({
    context: "general",

    changeContext(context, _this=this) {
	      Ember.set(_this, 'context', context);
    }
});
