import Editor from './Editor/Editor';
import Popover from './Popover/Popover';

/* eslint-disable */
console.log('it works!');

// the first task about Popover
const popover = new Popover();
popover.bindToDOM(document.querySelector('#popover-container'));

// the second task about Editor
const editor = new Editor();
editor.bindToDOM(document.querySelector('#editor-container'))

