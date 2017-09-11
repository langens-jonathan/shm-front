import DS from 'ember-data';

export default DS.Model.extend({
    amount: DS.attr('string'),
    fulfilled: DS.attr('string'),
    due: DS.attr('date'),
    contract: DS.belongsTo('contract'),
    payments: DS.hasMany('payment')
});
