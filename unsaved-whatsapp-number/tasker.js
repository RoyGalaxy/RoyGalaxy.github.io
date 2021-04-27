function sendMessage(){
    const tel = document.querySelector("#tel").value;
    const text = document.querySelector('#text').value;
    window.open(`whatsapp://send?phone=+91${tel}&text=${text}`)
}