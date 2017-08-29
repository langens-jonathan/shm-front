import Ember from 'ember';
import DefaultQueryParamsMixin from 'ember-data-table/mixins/default-query-params';

export default Ember.Controller.extend(DefaultQueryParamsMixin, {
    actions: {
        rowClicked(item) {
            this.transitionToRoute('/tenants/' + Ember.get(item, 'id'));
        }
    }
});
