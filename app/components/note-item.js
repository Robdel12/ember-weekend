import Ember from 'ember';
import layout from '../templates/components/note-item';

export default Ember.Component.extend({
  layout: layout,
  player: Ember.inject.service('player'),
  tagName: 'li',
  classNameBindings: ['active'],
  active: false,
  click(e){
    if(this.$()[0] === e.target) {
      this.$('.timestamp').trigger('click');
    }
  },

  didInsertElement: function() {
    this._super.apply(this, arguments);

    // We have to do this because services are lazily looked up. See these links:
    // https://github.com/emberjs/ember.js/issues/10821
    // http://emberjs.jsbin.com/wisusonepa/2/edit?html,js,output
    this.get('player');
  },

  highlightItem: Ember.observer('player.currentTime', function() {
    var index = this.get('index');
    var currentTime = this.get('player').get('currentTime');
    var arrayOfStops = this.get('arrayOfStops');
    var currentItem = arrayOfStops[index];
    var nextItem = arrayOfStops[index + 1];

    if(currentItem <= currentTime && currentTime <= nextItem) {
      this.set('active', true);
    } else {
      this.set('active', false);
    }
  })
});
