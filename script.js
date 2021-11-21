function myFunction()  {
    document.body.classList.toggle('light');
    document.body.classList.toggle('dark');
    var cards = document.getElementsByClassName('block');
    for(var i=0; i< cards.length; i++){
        cards[i].classList.toggle('neumorphism');
        cards[i].classList.toggle('neumorphism-dark');
    }
    var projects = document.getElementsByClassName('project');
    for(var i=0; i< cards.length; i++){ 
        projects[i].classList.toggle('inset');
        projects[i].classList.toggle('inset-dark');
    }
    var icons = document.getElementsByClassName('link');
    for(var i=0; i< icons.length; i++){ 
        icons[i].classList.toggle('icon');
        icons[i].classList.toggle('icon-dark');
    }
    var inputs = document.getElementsByClassName('form-input');
    for(var i=0; i< inputs.length; i++){
        inputs[i].classList.toggle('input');
        inputs[i].classList.toggle('input-dark');
    }
    var button = document.getElementsByClassName('button');
    for(var i=0; i<button.length; i++){
        button[i].classList.toggle('neobutton');
        button[i].classList.toggle('neobutton-dark');
    } 
}           