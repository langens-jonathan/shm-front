import DS from 'ember-data';

export default DS.Model.extend({
    amount: DS.attr('string'),
    fullfulled: DS.attr('string'),
    contract: DS.belongsTo('contract'),
    payments: DS.hasMany('payment')
});
