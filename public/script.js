if (localStorage.getItem('darkMode') === null) { localStorage.setItem('darkMode', 'false') }

checkDarkMode()

function checkDarkMode () {
  if (localStorage.getItem('darkMode') === 'true') {
    if (document.body.classList.contains('light')) toggleDarkMode()
  } else {
    if (document.body.classList.contains('dark')) toggleDarkMode()
  }
}

function toggleDarkMode () {
  if (localStorage.getItem('darkMode') === 'true') {
    localStorage.setItem('darkMode', 'false')
    document.getElementById('light_off').play()
  } else {
    localStorage.setItem('darkMode', 'true')
    document.getElementById('light_on').play()
  }
  document.body.classList.toggle('light')
  document.body.classList.toggle('dark')
  const cards = document.getElementsByClassName('block')
  Array.from(cards).forEach((i) => {
    i.classList.toggle('neumorphism')
    i.classList.toggle('neumorphism-dark')
  })
  const projects = document.getElementsByClassName('project')
  Array.from(projects).forEach((i) => {
    i.classList.toggle('inset')
    i.classList.toggle('inset-dark')
  })
  const icons = document.getElementsByClassName('link')
  Array.from(icons).forEach((i) => {
    i.classList.toggle('icon')
    i.classList.toggle('icon-dark')
  })
  const inputs = document.getElementsByClassName('form-input')
  Array.from(inputs).forEach((i) => {
    i.classList.toggle('input')
    i.classList.toggle('input-dark')
  })
  const button = document.getElementsByClassName('button')
  Array.from(button).forEach((i) => {
    i.classList.toggle('neobutton')
    i.classList.toggle('neobutton-dark')
  })
}
