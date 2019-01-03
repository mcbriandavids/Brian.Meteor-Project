

import { Template } from 'meteor/templating';

import  { Tasks } from '../api/tasks.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './body.html';
import './task.js';


Template.body.onCreated(function onCreated() {
    this.state = new ReactiveDict();
});

Meteor.subscribe('tasks');

Template.body.helpers({
    tasks: [
        {text: 'This is task one'},
        {text: 'This is task two'},
        {text: 'This is task three'},
    ],
    tasks(){
        const instance = Template.instance();
        if (instance.state.get('hideCompleted')){
            return Tasks.find({checked:{ne:true}}, {sort:{createdAt:-1}})
        }
        return Tasks.find({}, {sort:{createdAt: -1}});
    },
    incompleteCount(){
        return Tasks.find({checked:{ne:true}}).count();

    }
})

Template.body.events({
    'submit .new-tasks'(event){
event.preventDefault();
const target = event.target;

const text  = target.text.value;

Meteor.call('tasks.insert', text)

target.text.value = ' ';
    },


    'change .hide-completed input'(event, instance){
        instance.state.set('hideCompleted', event.target.checked);
    },
});

