// Ejemplo con objetos
const user = {
    nombre:'Jose',
    apellido: 'Perez',
    edad: 34
}

//Esto pasa de un objeto JS a Jason. 
localStorage.setItem("usuario", JSON.stringify(user))


// Leer el objeto de Jason a JS
const resultado = JSON.parse(localStorage.getItem("usuario"))






//Guardar dat os uso una key y el valor
localStorage.setItem("usuario", "Juan Ramon Valdez")

//Obtener datos del localStorage
localStorage.getItem("usuario")

//Borrar un dato guardado
// localStorage.removeItem("usuario")

//borrar todo el Local Storage
localStorage.clear()
