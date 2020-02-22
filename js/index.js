import tabs from './parts/tabs.js';
import calc from './parts/calc.js';
import slider from './parts/slider.js';
import timer from './parts/timer.js';
import modal from'./parts/modal.js';
import form from'./parts/form.js';

    
 
    'use strict';
    calc();
    slider();
    tabs();
    timer();
    modal();
    form();

let imputVal = document.querySelector('.popup-form__input');

imputVal.addEventListener('onkeypress', () => {
    cislo();
});
function cislo(){
    if (event.keyCode != 43 && event.keyCode < 48 || event.keyCode > 57)
    event.preventDefault();
}