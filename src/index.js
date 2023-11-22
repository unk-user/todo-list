import UI from "./modules/UI";


//navbar 

const navCheck = document.querySelector('#checkbox');
const nav = document.querySelector('nav');

navCheck.addEventListener('click', ()=>{
    const contentSection = document.querySelector('#mainSection');
    if(navCheck.checked){
        nav.style.position = 'relative';
        nav.style.left = '0';
        contentSection.style.width = 'calc(100% - 260px)';
    } else {
        nav.style.position = 'absolute';
        nav.style.left = '-300px';
        contentSection.style.width = '100%';
    }

});

UI.loadUi();
