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
        getList();
        let n = entries.length;
        
        localStorage[`name${n}`] = name.value;
        localStorage[`rate${n}`] = rate.value;
        localStorage[`qty${n}`] = qty.value;
        entries.push(n)
        clear();
        
        localStorage.setItem('list',JSON.stringify(entries));
    }
);

// Reset Form Entries
const clear = () => {
    name.value = '';
    rate.value = '';
    qty.value = '';
    
    name.focus();
}

// Show Popup
listbtn.onclick = () => {
    createList();
    popup.classList.toggle('active');
}

// Make list
var entries = [];
function createList(){
    getList();
    list.innerHTML = '';
    var sum = 0;
    for(var i = 0;i < entries.length; i++){
        let name = localStorage[`name${entries[i]}`];
        let rate = localStorage[`rate${entries[i]}`];
        let qty = localStorage[`qty${entries[i]}`];
        const li = `<li>${i+1}. ${name} (${qty}) <span><span id="danger" class="${i}" onclick="del(this)">Delete</span> ${rate * qty}</span></li>`;
        
        list.innerHTML += li
        sum += rate * qty;
    }
    
    total.innerHTML = `total: ${sum}`
}

// Clear Local Storage
function emptyList(){
    if(!confirm('Do you really want to Clear All')) return;
    localStorage.clear();
    entries = [];
    createList();

}

function del(el){
    if(!confirm('Do you really want to Delete this')) return;
    const num = parseInt(el.className)
    
    localStorage.removeItem(`name${num}`);
    localStorage.removeItem(`rate${num}`);
    localStorage.removeItem(`qty${num}`);
    
    entries.splice(num,1);
    localStorage.setItem('list',JSON.stringify(entries));
    
    createList();
    
}

function getList(){
    var list = localStorage.getItem('list');
    if(list == undefined){
        return 2+4
    }
    else{
        entries = JSON.parse(list);
    }
}