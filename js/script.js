window.addEventListener('DOMContentLoaded', () => {
    let body = document.querySelector('body');
    'use strict';

    //Tabs
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');
        
    //function hideTabContent(a)
    let hideTabContent = (a) => {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    };
    hideTabContent(1);

    //function showTabContent(b)
    let showTabContent = (b) => {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    };
    //info.addEventListener('click', function(event) 
    info.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });


    //Таймер
    let deadline = '2018-12-21';

    //function getTimeRemaining(endtime)
    let getTimeRemaining = (endtime) => {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));
        
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (hours < 10) {
                hours = '0' + hours;
            }
            if (t < 0) {
                t = 0;
            };

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    
    //function setClock(id, endtime)
    let setClock = (id, endtime) => {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
        
        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent =  t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
        
    } 
    
    setClock('timer', deadline);// таймер

    //Modal
    //body.addEventListener('click', function(e)
    body.addEventListener('click', function(e) {

        

        let target = e.target,
             overlay = document.querySelector('.overlay');

        if (target.classList.contains('description-btn') || target.classList.contains('more')) {
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        if (target.classList.contains('popup-close')) {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        }
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }  
            }
        }
        if ((restDays.value == '' || persons.value == '') || (restDays.value == '0' || persons.value == '0')) {
            totalValue.innerHTML = 0;
        }
        if ((restDays.value != Math.floor(restDays.value)) || (persons.value != Math.floor(persons.value)) || (restDays.value == '0' || persons.value == '0')) {
            totalValue.innerHTML = 0;
        }

    });


    //Form
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так... '
    };

    let form = document.querySelector('.main-form'),
        formCont = document.querySelector('#form'),
        input = form.getElementsByTagName('input'),
        statusMessege = document.createElement('div');

        statusMessege.classList.add('status');

    function modForm(elem) {   
        elem.addEventListener('submint', function(e) {
            e.preventDefault();//отменяем стандартное поведение браузера
            elem.appendChild(statusMessege);

            let formData = new FormData(elem);

            function postData(data) {
                return new Promise(function(resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');

                    request.setRequestHeader('Content-Type', 
                        'application/json; charset=utf-8');

                    request.onreadystatechange = function() {
                        if (request.readyState < 4) {
                            resolve();
                        } else if(request.readyState === 4) {
                            if(request.status < 3 && request.status == 200) {
                                resolve();
                            } else {
                                reject();
                            }
                        }
                    };
                    request.send(data);
                });
            }    
            //очищаем инпут 
            function clearInput(){
                [...input].forEach(elem => (elem.value=''));
            }
            
            postData(formData)
                .then(() => (statusMessege.textContent = message.loading))
                .then(() => (statusMessege.textContent = message.success))
                .catch(() => (statusMessege.textContent = message.failure))
                .then(clearInput);
        });
    }

    modForm(form);
    modForm(formCont);

    const inputPhone = document.querySelectorAll('input[name="phone"]');

    [...inputPhone].forEach(elem => (elem));

    //slider

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
    
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }


    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    function currentSlides(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });
    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlides(i);
            }
        }
    });

        
    //Calc
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('change', function() {
        personsSum = +this.value;
        total = (daysSum + personsSum)*4000;
         
        if(restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener('change', function() {
        daysSum = +this.value;
        total  = (daysSum + personsSum)*4000;

        if(persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener('change', function() {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });

});
