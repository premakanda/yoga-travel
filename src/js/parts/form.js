function form() {
    let more = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close'),
    statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    
    
    more.addEventListener('click', () => {
        overlay.style.display = 'block';
        more.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });
    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
       

    });
   


    let sendRequest = function (target) {
        
        let message = {
            loading: `<img src='https://img-fotki.yandex.ru/get/4914/54833049.21/0_803b8_ba6370a6_XS.jpg'>`,
            success: `<img src='https://img-fotki.yandex.ru/get/5113/54833049.22/0_803bd_d6d87b9f_XS.jpg'>`,
            failure: `<img src='https://img-fotki.yandex.ru/get/5810/54833049.22/0_803b9_56e09f93_XS.jpg'>`
            };
        
        
        target.appendChild(statusMessage);
        let formData = new FormData(target),
            obj = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            });
        let json = JSON.stringify(obj);
       function postData(json){
    
        return new Promise(function(resolve,reject){
    
        let request = new XMLHttpRequest();
            request.open('POST','server.php');
            request.setRequestHeader('Content-type','application/json; charset=utf-8');
    
            request.onreadystatechange =  () => {
                if (request.readyState < 4){
                    resolve();
                } else if (request.readyState === 4 && request.status === 200){
                    resolve();
                } else {
                   reject();
                }  
            };
            request.send(json);
        });
       } 
        function clearInput(){
            let input = target.getElementsByTagName('input');
            for(let i = 0; i < input.length; i++){
                input[i].value = '';
            }
        }
        postData(formData)
            .then(() => statusMessage.innerHTML = message.loading)
            .then(() => statusMessage.innerHTML = message.success)
            .catch(() => statusMessage.innerHTML = message.failure)
            .then(clearInput)
    };
    
    let body = document.querySelector('body');
            body.addEventListener('submit', e => {
                e.preventDefault();
                let target = e.target;
    
                if(target.id == 'form' || target.classList.contains('main-form')) {
                    sendRequest(target);
                }
            });
        }

export default form;