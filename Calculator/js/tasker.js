const display = document.querySelector('#display');
const answerDisplay = document.querySelector('#answer')
let equation = '';

function type(num){
    display.value += num;
    if(isNaN(parseInt(num))){
        return;
    }
    equation += num;
}

function clearDisplay(){
    display.value = '';
    equation = '';
    answer();
}

function answer(){
    let ans = eval(equation);
    if(isNaN(ans) || typeof ans == 'undefined'){
        ans = 0;
    }
    answerDisplay.value = ans;
}

function calculate(sym){
    switch (true){
        case sym == '*':
            type('x');
            equation += sym;
            break;
        case sym == '/':
            type('÷');
            equation += sym;
            break;
    }
    if(sym == '+' || sym == '-' || sym == '.'){
        type(sym);
        equation += sym;
    }
}

function changeSign(){
    let arr1 = equation.split('');
    let arr2 = display.value.split('');
    // Changing sign
    if(display.value[0] == '-'){
        arr1.shift();
        arr1.shift();
        arr1.pop()
        
        // printing sign
        arr2.shift();
        arr2.shift();
        arr2.pop();
    }
    else{
        arr1.unshift('(');
        arr1.unshift('-');
        arr1.push(')')
        
        // printing sign
        arr2.unshift('(');
        arr2.unshift('-');
        arr2.push(')');
    }
    equation = arr1.join('');
    display.value = arr2.join('')
}