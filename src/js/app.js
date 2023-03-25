import MyForm from './MyForm/Form';
import Popover from './Popover/Popover';

/* eslint-disable */
console.log('it works!');
// the first task about Popover
const popover = new Popover();
popover.bindToDOM(document.querySelector('#popover-container'));

// my Form exsample

const myForm = new MyForm();
myForm.bindToDOM(document.querySelector('#form-container'));