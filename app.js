let toggleBtn = document.querySelector('.toggle-btn')
let bodyElement = document.querySelector('body')

function setDarkTheme(){
    bodyElement.classList.toggle('dark')
}

toggleBtn.addEventListener('click', switchTheme)

function switchTheme() {
  let darkMode = localStorage.getItem('dark')

  if (darkMode !== 'on') {
      setDarkTheme()
    darkMode = localStorage.setItem('dark', 'on')
  } else {
      setDarkTheme()
    darkMode = localStorage.setItem('dark', 'off')
  }
}

let darkMode = localStorage.getItem('dark')

if(darkMode === 'on'){
    setDarkTheme()
}