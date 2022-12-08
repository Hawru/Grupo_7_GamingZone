const basicRegex = /([A-Za-z0-9_-]+)/g  //Regex para usuario y contraseña
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const allowedExtensionsRegex = /(\.jpg|\.jpeg|\.png)$/i;

/* Validacion Login */
function validateFormLogin(e){
    e.preventDefault();
    let usernameLog = document.getElementById("usernamelog").value;
    let passwordLog = document.getElementById("passwordlog").value;
    if(typeof usernameLog != "string" || !basicRegex.test(usernameLog))
    {
        Swal.fire({
            icon: 'error',
            title: 'Validacion',
            text: 'El Usuario no debe contener caracteres especiales'
          })
        return;
    }
    if(typeof passwordLog != "string" || !basicRegex.test(passwordLog))
    {
        Swal.fire({
            icon: 'error',
            title: 'Validacion',
            text: 'La contraseña no debe contener caracteres especiales'
          })
        return;
    }
    formLogin.submit();
}

/* Validacion Registro Usuario */
function validateRegisterUser(e){
    e.preventDefault();
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let profile_image = document.getElementById("profile_image").value;
    let password = document.getElementById("password").value;
    if(typeof username != "string" || !basicRegex.test(username))
    {
        Swal.fire({
            icon: 'error',
            title: 'Validacion',
            text: 'El Usuario no debe contener caracteres especiales'
          })
        return;
    }
    if(typeof email != "string" || !emailRegex.test(email))
    {
        Swal.fire({
            icon: 'error',
            title: 'Validacion',
            text: 'Debes ingresar un Email Valido'
          })
        return;
    }
    if(!profile_image || !allowedExtensionsRegex.test(profile_image))
    {
        Swal.fire({
            icon: 'error',
            title: 'Validacion',
            text: 'Debes ingresar una Imagen'
          })
        return;
    }
    if(typeof password != "string" || !basicRegex.test(password))
    {
        Swal.fire({
            icon: 'error',
            title: 'Validacion',
            text: 'La contraseña no debe contener caracteres especiales'
          })
        return;
    }
    formRegister.submit();
}

/* Validacion Crear y Actualizar Producto */
function validateCUProduct(e){
    e.preventDefault()
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let price = parseInt(document.getElementById("price").value);
    let discount = parseInt(document.getElementById("discount").value);
    let primary_image = document.getElementById("primary_image").value;
    let placa = document.getElementById("placa").value;
    let procesador = document.getElementById("procesador").value;
    let ram = document.getElementById("ram").value;
    let almacenamiento = document.getElementById("almacenamiento").value;
    if(typeof title != "string" || title.length > 120) 
    {
        Swal.fire({
            icon: 'error',
            title: 'Validacion',
            text: 'El titulo no debe pasar de los 120 caracteres'
          })
        return;
    }
    if(typeof description != "string") 
    {
        Swal.fire({
            icon: 'error',
            title: 'Validacion',
            text: 'Por favor digite una descripcion valida'
          })
        return;
    }
    if(isNaN(price) || price < 0) 
    {
        Swal.fire({
            icon: 'error',
            title: 'Validacion',
            text: 'El precio debe contener numeros y ser mayor o igual que 0'
          })
        return;
    }
    if(isNaN(discount) || discount < 0) 
    {
        Swal.fire({
            icon: 'error',
            title: 'Validacion',
            text: 'El precio debe contener numeros y ser mayor o igual que 0'
          })
        return;
    }
    if(!primary_image || !allowedExtensionsRegex.test(primary_image)) {
        Swal.fire({
            icon: 'error',
            title: 'Validacion',
            text: 'Debes enviar una imagen valida(png, jpg, jpeg)'
          })
        return;
    }
    if(placa == "") {
        Swal.fire({
            icon: 'error',
            title: 'Validacion',
            text: 'Debes seleccionar alguna opcion de placa'
          })
        return;
    }
    if(procesador == "") {
        Swal.fire({
            icon: 'error',
            title: 'Validacion',
            text: 'Debes seleccionar alguna opcion de procesador'
          })
        return;
    }
    if(ram == "") {
        Swal.fire({
            icon: 'error',
            title: 'Validacion',
            text: 'Debes seleccionar alguna opcion de ram'
          })
        return;
    }
    if(almacenamiento == "") {
        Swal.fire({
            icon: 'error',
            title: 'Validacion',
            text: 'Debes seleccionar alguna opcion de almacenamiento'
          })
        return;
    }
    formCreateProduct.submit();
}

document.getElementById("login-form").addEventListener('submit', validateFormLogin);
document.getElementById("register-form").addEventListener('submit', validateRegisterUser);
document.getElementById("create-form").addEventListener('submit', validateCUProduct);



