
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './body.html';
import './task.html';


Template.task.helpers({
    isOwner(){
        return this.owner === Meteor.userId();
    },
})
Template.task.events ({
'click .toggle-checked'(){
    //set the check property to the opposite of it's current value
    Tasks.update(this._id, 
        {$set: {checked: ! this.checked}
        
    });
    Meteor.call(tasks.setChecked, this._id, !this.checked);
},
'click .delete'(){
     Meteor.call('tasks.remove', this._id,);
},
'click toggled-private'(){
    Meteor.call(tasks.setPrivate, this._id, !this.private);
}
})