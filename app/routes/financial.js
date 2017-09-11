import Ember from 'ember';
import ContextAwareRoute from '../mixins/context-aware-route';

export default Ember.Route.extend(ContextAwareRoute, {
    context: "FINANCIAL-All Time",

    actions: {
        changeContext(context) {
            Ember.Logger.log("in route, changing context to: " + context);
            Ember.set(this, 'context', context);

            var changeContext = Ember.get(this, 'contextService.changeContext');
            changeContext(context, Ember.get(this, 'contextService'));
        }
    }
});
