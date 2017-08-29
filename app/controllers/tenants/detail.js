import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        updateUser(user) {
            console.log(user);
        }
    }
});
