import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
    this.route('tenants', function() {
	this.route('detail', { path: '/:tenant_id'});
    });
    this.route('contracts');
});

export default Router;
