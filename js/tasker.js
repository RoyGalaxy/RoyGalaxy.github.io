function openApp(name){
    switch (name) {
        case 'whatsapp':
            window.open(`whatsapp://send?phone=+918058523111&text=Hello, I just wanted to say you something`);
            break;
        case 'instagram':
            window.open('instagram://user?username=roy__galaxy');
            break;
        case 'email':
            window.open('mailto:ajroyssttle@gmail.com?Subject=Registration&body=Your text here...')
        default:
            // code
    }
}

function openForm(){
    window.open("login/login.html");
}