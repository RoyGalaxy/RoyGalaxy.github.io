if('Notification' in window){
    if(Notification.permission !== 'denied'){
        let text = 'hello';
        let opt = {
            body:'Hi I am Roy Galaxy'
        }
        let n = new Notification(text,opt);
    }
}
