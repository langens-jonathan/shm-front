import Ember from 'ember';
import ContextAwareRoute from '../mixins/context-aware-route';

export default Ember.Route.extend(ContextAwareRoute, {
    context: "CONTRACTS-OVERVIEW"
});
