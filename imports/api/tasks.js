import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
export const Tasks = new Mongo.Collection('tasks');


if (Meteor.isServer){
    Meteor.publish('tasks', function tasksPublication(){
        return Tasks.find({
         $or:[
             {private: {$ne:true} },
             {owner:this.userId}
         ],   
        });
    });
}

Meteor.methods({
    'tasks.insert'(text){
        check(text, String);

        if ( ! Meteor.userId()){
            throw new Meteor.Error('unauthorised user');
        }
        Tasks.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username
                });
    },
 'tasks.remove'(taskId){
     check(taskId, String);
     if( tasks.owner && tasks.private !== Meteor.userId()){
         throw new Meteor.Error('not-authorised');
     }
     Tasks.remove(taskId);
     
 },
 'tasks.setChecked'(taskId, setChecked){
     check(taskId, String);
     check(setChecked, Boolean);

     const tasks = Tasks.find(taskId);
    if (tasks.owner && tasks.private !== Meteor.userId()){
        throw new Meteor.Error('not authorised');
    }
;
    },

    'tasks.private'(taskId, setToPrivate){
        check(taskId, String);
        check(setToPrivate, Boolean);
        const tasks = Tasks.findOne(taskId);
        if (tasks.owner && tasks.public !== Meteor.userId()){
            throw new Meteor.Error('not-authorised');
        }
        Tasks.update(taskId, {$set:{private:setToPrivate}})
    },
    
    })
