import Ember from 'ember';

export default Ember.Service.extend({
    context: undefined,

    changeContext(context, _this=this) {
	Ember.set(_this, 'context', context);
    }
});
