const name = document.querySelector('#name');
const rate = document.querySelector('#rate');
const qty = document.querySelector('#quantity');
const popup = document.querySelector('.popup');
const listbtn = document.querySelector('.listbtn');
const list = document.querySelector('.list');
const form = document.querySelector('form');

form.addEventListener("submit",
    () => {
        let n = (localStorage.length)/3;
        
        localStorage[`name${n}`] = name.value;
        localStorage[`rate${n}`] = rate.value;
        localStorage[`qty${n}`] = qty.value;
        
        console.log(localStorage);
        clear();
    }
);

const clear = () => {
    name.value = '';
    rate.value = '';
    qty.value = '';
}

listbtn.onclick = () => {
    createList();
    popup.classList.toggle('active');
}

function createList(){
    list.innerHTML = ''
    for(var i = 0;i < localStorage.length/3; i++){
        list.innerHTML += `<li>${i+1}. ${localStorage[`name${i}`]} (${localStorage[`qty${i}`]}) <span>${localStorage[`rate${i}`] * localStorage[`qty${i}`]}</span></li>`;
    }
}

function emptyList(){
    localStorage.clear();
    createList();
    
}