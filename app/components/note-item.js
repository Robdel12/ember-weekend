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

  highlightItem: Ember.observer('player.currentTime', function() {
    var currentTime = this.get('player').get('currentTime');
    var startTime = this.get('startTime');
    var endTime = this.get('endTime');


    if(startTime <= currentTime && currentTime <= endTime) {
      this.set('active', true);
    } else {
      this.set('active', false);
    }
  })
});
