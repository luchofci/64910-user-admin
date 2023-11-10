// Este archivo header lo vamos a utilizar cross todo el site

/*
    Tenemos que obtener el nav y el user info.
    Hay que evaluar si tenemos un usuario logeado
    Si tenemos user logueado
        *evaluar su roll y ver si pintamos en el nav el boton de admin products y admin user.
        * userInfo:
            -pintar el nombre del usuario
            -Pintar el boton de logout.-
    Si no tenemos user logueado:
        *No pintamos los botones admin
        *No colocamos el name
        *Pintar el boton de login.-

*/

const headerNav = document.getElementById('header-nav');
const userInfoHeader = document.getElementById('header-user');

const loguedUser = JSON.parse(localStorage.getItem("currentUser"));

if(loguedUser ){
    if(loguedUser.role === 'ADMIN_ROLE'){

        const adminUserLink = document.createElement("a")

        adminUserLink.href = '/pages/admin/user-admin.html'
        adminUserLink.innerText ='User admin'
        adminUserLink.classList.add('header-link');
        
        headerNav.appendChild(adminUserLink)


        const productAdminLink = document.createElement("a")

        productAdminLink.href = '/pages/admin/product-admin.html'
        productAdminLink.innerText ='Product admin'
        productAdminLink.classList.add('header-link');
        
        headerNav.appendChild(productAdminLink)

    }

    const userNameHTML =  userInfoHeader.querySelector('.user-name');

    userNameHTML.innerText = loguedUser.fullname;


    const userImg = document.createElement('img');

    userImg.src = loguedUser.image; 
    userImg.alt = `${loguedUser.fullname} profile picture`
    userImg.classList.add('user-profile-picture');

    userInfoHeader.appendChild(userImg);


    const userActionHTML = userInfoHeader.querySelector('.user-action');

    const logoutButton = document.createElement('button');

    logoutButton.classList.add('header-link');
    logoutButton.innerText = 'Logout';

    userActionHTML.onclick = function(){
        localStorage.removeItem('currentUser');
        window.location.href = '/index.html';
    };

    userActionHTML.appendChild(logoutButton);




}else{
    const userActionHTML = userInfoHeader.querySelector('.user-action');

    const loginLink = document.createElement("a");
    loginLink.href = '/pages/login/login.html';
    loginLink.innerText = 'Ingresar';
    loginLink.classList.add('header-link');

    userActionHTML.appendChild(loginLink);

}