import {EventEmitter} from 'events';

let events = new EventEmitter();
/*
loggedIn        - user logged in
loggedOut       - user logged out
*/

export {events};