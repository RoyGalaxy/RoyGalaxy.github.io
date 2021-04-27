function openApp(name){
    switch (name) {
        case 'whatsapp':
            window.open(`whatsapp://send?phone=+918058523111&text=Hello, I just wanted to say you something`,taget='_self');
            break;
        case 'instagram':
            window.open('instagram://user?username=roy__galaxy',taget='_self');
            break;
        case 'email':
            window.open('mailto:ajroyssttle@gmail.com?Subject=Registration&body=Your text here...',taget='_self')
        default:
            // code
    }
}

function launch(item){
    window.open(`${item}/index.html`,taget='_self')
}

function view(id){
    document.getElementById(`${id}`).scrollIntoView({behavior:'smooth'});
}