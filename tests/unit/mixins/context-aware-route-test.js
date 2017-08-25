import Ember from 'ember';
import ContextAwareRouteMixin from 'real-estate-manager-front/mixins/context-aware-route';
import { module, test } from 'qunit';

module('Unit | Mixin | context aware route');

// Replace this with your real tests.
test('it works', function(assert) {
  let ContextAwareRouteObject = Ember.Object.extend(ContextAwareRouteMixin);
  let subject = ContextAwareRouteObject.create();
  assert.ok(subject);
});
