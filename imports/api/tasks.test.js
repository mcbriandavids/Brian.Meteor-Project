

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assertc} from 'meteor/practicalmeteor:chai';
import { Tasks } from '../tasks.js';

if (Meteor.isServer){
    decribe('Tasks', ()=>{
        decribe('methods', ()=>{
            const userId = Random.id();
            let tasksId;
            beforEach(()=>{
                Tasks.remove({});
            tasksId = Tasks.insert({
                text: 'test task',
                createdAT: new Date(),
                owner: userId,
                user: 'tmeasday',
            });           
         });
            it('can delete owned task', ()=>{
                const deleteTask = Meteor.isServer.method_handlers['tasks.remove'];
                const invocation = {userId};
                deleteTask.apply(invocation, [tasksId]);
                assertc.equal(Tasks.find().count(), 0);

            });
        });
    });
}