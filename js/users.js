const usersArray = JSON.parse(localStorage.getItem("users"))

// let usersArray;

// if(JSON.parse(localStorage.getItem("users"))){
// //Si es nulo
//     usersArray = JSON.parse(localStorage.getItem("users"))
// }else{
//     usersArray = []
// }


// Obtener el body de la tabla
const tableBody = document.getElementById('table-body')
const searchInput = document.querySelector('#search')
const userForm = document.querySelector("form#user-form")
const submitBtn = userForm.querySelector('button[type=submit]')

userForm.addEventListener("submit", (evt) => {

    //este prevent es para que la pagina/consola  no se recargue y quede la info para ver en la consola y no se recargue y se pierda por default.- Esto es asi siempre- se copia y pega
    evt.preventDefault()
    const el = evt.target.elements;

    //Deberia cortar la ejecucuon de la funcion callback del evento submit cuando:
    // password y password2 sean distintos
    if (el.password.value !== el.password2.value) {
        alert(`Las contraseñas no coinciden`)
        return;
    }
    // Email ya existe
    const emailExist = usersArray.find((user) => {

        if (user.email === el.email.value) {
            return true;
        }
    })

    if (emailExist && el.id.value !== emailExist.id) {
        Swal.fire({
            title: 'El correo ya existe',
            icon: 'error',
            timer: 2000,
        })
        return
    }


    // ##### If else convencional ######
    let id;
    if (el.id.value) {
        id = el.id.value
    } else {
        id: crypto.randomUUID()
    }
    //Aca abajo ponemos la misma logica que arriba, pero en una linea con ####### OPERADOR TERNARIO ########
    // const id = condicion ? condicionTrue : condicionFalse
    // const id = el.id.value ? el.id.value : crypto.randomUUID()


    const user = {
        fullname: el.nombreCompleto.value,
        age: el.age.valueAsNumber,
        email: el.email.value,
        password: el.password.value,
        active: el.active.checked,
        //Los checkbox, no van con value, xq sino te devuelve on/off, pero si los reemplazamos con checked, transformamos en TRUE/FALSE.(booleano)
        bornDate: new Date(el.bornDate.value).getTime(),
        location: el.location.value,
        id: id,
        //Esto de crypto va por default, dado que es una propiedad que se crea para sacar un ID random, de tal manera que no pueda duplicarse y cada usuario tenga una identidad diferente. Utilisza apis
        image: el.image.value,

    }

    //Pregunto si tengo un id para saber si estoy editando o no.
    if (el.id.value) {
        //editando
        const indice = usersArray.findIndex(usuario => {
            if (usuario.id === el.id.value) {
                return true
            }
        })
        //reemplazo el usuario en los datos nuevos del formulario
        usersArray[indice] = user

        Swal.fire({
            title: 'Usuario Editado',
            text: 'Los datos del usuario fueron actualizados correctamente',
            icon: 'success',
            timer: 1500
        })


    } else {
        //agregando un usuario nuevo
        usersArray.push(user)
        Swal.fire({
            title: 'Usuario Agregado',
            text: 'suario se creo correctamente',
            icon: 'success',
            timer: 1500
        })
    }
    //Al modificar el array necesito modificar la vista, poir eos lo vuelvo a pintar.
    PintarUsuarios(usersArray)
    actualizarLocalStorage()

    resetearFormularios()
})

function resetearFormularios() {
    userForm.reset()  //reseteo el formulario 
    userForm.elements.password.disabled = false; //Actrivo si estaban desactivados los input
    userForm.elements.password2.disabled = false;
    submitBtn.classList.remove('btn-edit') //Remuevo la clase editar
    submitBtn.innerText = 'Agregar usuario' //Vuelvo el texto del boton a su valor por defecto.
    userForm.elements.nombreCompleto.focus()
}




//Filtro de usuarios
//Escuchar usando el usuario presiona una tecla en el uinput search.
searchInput.addEventListener('keyup', (eventito) => {
    // Obtener el valor del input y pasarlo a minuscula
    const inputValue = eventito.target.value.toLowerCase();
    //Buscar en todos los usuarios aquellos donde su nombre tenga este texto

    const usuariosFiltrados = usersArray.filter((usuario) => {

        const nombre = usuario.fullname.toLowerCase()

        if (nombre.includes(inputValue)) {
            return true
        }
        return false
    })
    //Pintar solo los usuarios que hayan coincidido
    PintarUsuarios(usuariosFiltrados)

})
// console.log(tableBody)
// Iterar el array y agregar un tr por cada alumno que tengamos. 


function PintarUsuarios(arrayPintar) {
    //Iterar el array y aghregar un TR por cada aluimno que tengamos.
    tableBody.innerHTML = '';
    arrayPintar.forEach((user, indiceActual) => {
        tableBody.innerHTML += `
        <tr class="table-body">
            <td class="user-image">
                <img src="${user.image}" alt="${user.fullname} avatar">
            </td>
            <td class="user-name">${user.fullname}</td>
            <td class="user-email">${user.email}</td>
            <td class="user-location">${user.location}</td>
            <td class="user-age">${user.age}</td>
            <td class="user-date">${formatDate(user.bornDate)}</td>
            <td>
                <button class="action-btn btn-danger" 
                        title="Borrar Producto"
                        onclick="borrarUsuario('${user.id}', '${user.fullname}')">
                    <i class="fa-solid fa-trash-can"></i>
                </button> 

                <button class="action-btn" 
                        title="Editar usuario"
                        onclick="editarUsuario('${user.id}')">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
            </td>  
        </tr>`

    })

}
//Llamo por primera vez que se ejecute mi script la funcion pintar usuarios
PintarUsuarios(usersArray)



function actualizarLocalStorage() {
    localStorage.setItem("users", JSON.stringify(usersArray))




}



function borrarUsuario(ID, nombre) {

    const confirmDelete = confirm(`Realmente desea borrar este usuario ${nombre}`)
    if (!confirmDelete) {
        return
    }

    const indice = usersArray.findIndex(user => user.id === ID)

    usersArray.splice(indice, 1)
    PintarUsuarios(usersArray)
    actualizarLocalStorage()
}

//Los mas usados son ForEach, map, filter, findIndex, find, flat, flatMap, every, some.
function editarUsuario(idBuscar) {
    const userEdit = usersArray.find((usuario) => {

        if (usuario.id === idBuscar) {
            return true
        }
    })

    if (userEdit === undefined) {
        swal.fire('Error', 'No se pudo editar el usuario', 'error')
        //SWEETALERT ES una libreria simple que sirve para descargar carteles de alerta, o error, etc, muy amigable para el usurio. Lanza un popup// Tambien esta bueno para avisarle al usuario que exitosamente agrego sus datos.
        return
    }

    console.log(userEdit)

    const el = userForm.elements;

    el.id.value = userEdit.id;

    el.fullname.value = userEdit.fullname
    el.email.value = userEdit.email
    el.location.value = userEdit.location
    el.age.valueAsNumber = userEdit.age
    el.image.value = userEdit.image
    el.active.checked = userEdit.active

    el.password.value = userEdit.password
    el.password.disabled = true
    el.password2.value = userEdit.password
    el.password2.disabled = true

    el.bornDate.value = formatInputDate(userEdit.bornDate)


    submitBtn.classList.add('btn-edit');
    submitBtn.innerText = 'Editar usuario'



}



/* 
<tr class="table-body">
    <td class="user-image">
        <img src="https://m.media-amazon.com/images/I/81wNRtDaTXL.png" alt="Imagen de prueba">
    </td>
    <td class="user-name">Sonic Heroes</td>
    <td class="user-email">sonic@gmail.com</td>
    <td class="user-location">Super Mario World</td>
    <td class="user-age">24</td>
    <td class="user-date">24/05/98</td>
</tr> */