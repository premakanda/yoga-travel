function modal() {
    let body = document.querySelector('body');
    let tab = document.querySelectorAll('.info-header-tab');
    



    //body.addEventListener('click', function(e)
    body.addEventListener('click', (e) => {
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
        
    });
    
}

export default modal;