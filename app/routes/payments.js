import Ember from 'ember';
import ContextAwareRoute from '../mixins/context-aware-route';

export default Ember.Route.extend(ContextAwareRoute, {
    context: "PAYMENTS",

    model() {
        const options = {
            sort: '-fulfilled,-due',
            page: {
                number: 0,
                size: 100
            }};

        return this.get('store').query('debt', options);
    }
});
