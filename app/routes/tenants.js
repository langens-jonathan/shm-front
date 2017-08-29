import Ember from 'ember';
import ContextAwareRoute from '../mixins/context-aware-route';
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default Ember.Route.extend(ContextAwareRoute, DataTableRouteMixin, {
    context: "TENANTS-OVERVIEW",

    modelName: "tenant"
});
