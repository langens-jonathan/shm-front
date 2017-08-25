import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    address: DS.attr('string'),
    tel: DS.attr('string'),
    email: DS.attr('string'),
    contracts: DS.hasMany('contract'),
    payments: DS.hasMany('payment')
});
