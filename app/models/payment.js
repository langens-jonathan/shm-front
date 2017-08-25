import DS from 'ember-data';

export default DS.Model.extend({
    amount: DS.attr('string'),
    debts: DS.hasMany('debt'),
    tenant: DS.belongsTo('tenant')
});
