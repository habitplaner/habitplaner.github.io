export const drawAuth = (user) => {

  console.log('drawAuth', user)
  if (user) {
    authDiv.innerHTML = `${user.displayName}<img src="${user.photoURL}">`;
    authDiv.addEventListener('click', () => {
      confirm('Уже уходите?') ? window.auth.logout() : alert('❤️');
    })
  } else {
    const btn = document.createElement('button');
    btn.textContent='Войти'
    btn.addEventListener('click', ()=>{window.auth.login()})

    authDiv.innerHTML = ``;
    authDiv.append(btn);
  }
}