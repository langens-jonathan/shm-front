import DS from 'ember-data';

export default DS.Model.extend({
    startDate: DS.attr('date'),
    endDate: DS.attr('date'),
    deposit: DS.attr('number'),
    mensuality: DS.attr('number'),
    dailyRate: DS.attr('number'),
    tenant: DS.belongsTo('tenant', { inverse: 'contracts' }),
    room: DS.belongsTo('room', { inverse: 'contracts' }),
    debts: DS.hasMany('debt'),
    documents: DS.has<any('document')
});
