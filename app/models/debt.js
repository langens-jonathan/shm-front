import DS from 'ember-data';

export default DS.Model.extend({
    amount: DS.attr('string'),
    fulfulled: DS.attr('string'),
    due: DS.attr('date'),
    contract: DS.belongsTo('contract'),
    payments: DS.hasMany('payment')
});
