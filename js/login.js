/*

    Cargar usuarios en la DB (localStorage)
    tomar el formulario
    tomar los datos cargados

    Ver sie xiste un emaill como el que el usuario ingreso
    Corroborar que exista la contrase;a
        cuando no exista el email
        Existe el email pero la pass no coincide
            mensaje error

    
        hacer login
            guardar en el local Storage un currentUser



*/

const users = JSON.parse(localStorage.getItem("users")) || [];



const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (evt)=>{
    evt.preventDefault()

    /*Poner EVT.TARGET es LO MISMO QUE PONER LOGINFORM */
    const email = loginForm.elements.email.value.toLowerCase();
    const password = evt.target.elements.password.value;

    const user = users.find((usr)=>{
        if(email.toLowerCase() === usr.email.toLowerCase()){
            return true
            //return usr.email === email (esto seria igual que el if)
        }
        return false
    })

    //Cortamos el submit ya que no existe el correo
    if(!user){
        swal.fire({
            icon: 'error',
            title: 'Login Incorrecto',
            text: 'Alguno de los datos ingresados no es correcto',
            timer: 2000,
        })
        return
    }

    if( user.password !== password){
        swal.fire({
            icon: 'error',
            title: 'Login Incorrecto',
            text: 'Alguno de los datos ingresados no es correcto',
            timer: 2000,
        })
        return
    }

    delete user.password;

    localStorage.setItem("currentUser", JSON.stringify(user));

    swal.fire({
        icon: 'success',
        title: 'Login Correcto',
        text: 'Sera redireccionado en un momento',
        timer: 2000,
    })

    setTimeout(function(){
        window.location.href = '/index.html'
    }, 2500)
//con esta p[orcion de codigo, hacemos que en un tiempo, desde el logeo y lo redirigimos donde deseamos







})