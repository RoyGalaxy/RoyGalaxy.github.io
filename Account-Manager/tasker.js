// Document Elements
const name = document.querySelector('#name');
const rate = document.querySelector('#rate');
const qty = document.querySelector('#quantity');
const popup = document.querySelector('.popup');
const listbtn = document.querySelector('.listbtn');
const list = document.querySelector('.list');
const form = document.querySelector('form');
const total = document.querySelector('#total');

// On form Submit
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

// Reset Form Entries
const clear = () => {
    name.value = '';
    rate.value = '';
    qty.value = '';
}

// Show Popup
listbtn.onclick = () => {
    createList();
    popup.classList.toggle('active');
}

// Make list
function createList(){
    list.innerHTML = '';
    var sum = 0;
    for(var i = 0;i < localStorage.length/3; i++){
        let name = localStorage[`name${i}`];
        let rate = localStorage[`rate${i}`];
        let qty = localStorage[`qty${i}`];
        list.innerHTML += `<li>${i+1}. ${name} (${qty}) <span>${rate * qty}</span></li>`;
        sum += rate * qty;
    }
    
    total.innerHTML = `total: ${sum}`
    
}

// Clear Local Storage
function emptyList(){
    localStorage.clear();
    createList();
}