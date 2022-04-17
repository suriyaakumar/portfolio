function myFunction()  {
    document.body.classList.toggle('light');
    document.body.classList.toggle('dark');
    var cards = document.getElementsByClassName('block');
    Array.from(cards).forEach(
        i => {
            i.classList.toggle('neumorphism');
            i.classList.toggle('neumorphism-dark');
        }
    )
    var projects = document.getElementsByClassName('project');
    Array.from(projects).forEach(
        i => {
            i.classList.toggle('inset');
            i.classList.toggle('inset-dark');
        }
    )
    var icons = document.getElementsByClassName('link');
    Array.from(icons).forEach(
        i => {
            i.classList.toggle('icon');
            i.classList.toggle('icon-dark');
        }
    )
    var inputs = document.getElementsByClassName('form-input');
    Array.from(inputs).forEach(
        i => {
            i.classList.toggle('input');
            i.classList.toggle('input-dark');
        }
    )
    var button = document.getElementsByClassName('button');
    Array.from(button).forEach(
        i => {
            i.classList.toggle('neobutton');
            i.classList.toggle('neobutton-dark');
        }
    )
}           