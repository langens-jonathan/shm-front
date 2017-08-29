import Ember from 'ember';
import ContextAwareRoute from '../../mixins/context-aware-route';
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default Ember.Route.extend(ContextAwareRoute, {
    model(params) {
        var context = "TENANTS-" + params.tenant_id;
        Ember.set(this, 'context', context);

        var detailPromise = Ember.get(this, 'store').find('tenant', params.tenant_id);

        detailPromise.then(function(tenant) {
            var contractsPromise = Ember.get(tenant, 'contracts');

            // if(contracts instanceOf Array) {
            //     contracts.forEach(function(contract) {
            //         Ember.Logger.log(contract);
            //     })
            // }
            contractsPromise.then(function(contracts) {
                contracts.forEach(function(contract) {
                    var startDate = Ember.get(contract, 'startDate');
                    var startDateF = startDate.getDay() + " " + startDate.getMonth() + " " + startDate.getYear();
                    Ember.set(contract, 'startDateF', startDateF);
                    Ember.Logger.log(contract);
                });
            });
        });

        return detailPromise;
    }
});
