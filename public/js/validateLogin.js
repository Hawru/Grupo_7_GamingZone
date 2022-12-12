const userRegex = /^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
const passwordRegex = /^[a-zA-Z0-9._-]{5,10}$/
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const allowedExtensionsRegex = /(\.jpg|\.jpeg|\.png)$/i;
let loginForm = document.getElementById("login-form");
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let usernameLog = document.getElementById("usernamelog").value;
    let passwordLog = document.getElementById("passwordlog").value;
    if(typeof usernameLog !== 'string' || !userRegex.test(usernameLog)) {
        Swal.fire({
            icon: 'error',
            title: 'Validacion',
            text: 'Debes ingresar un usuario valido(No puede tener caracteres especiales ni tener menos de 4 a 20 letras)'
        })
        return;
    }
   if(typeof passwordLog !== 'string' || !passwordRegex.test(passwordLog)) {
        Swal.fire({
            icon: 'error',
            title: 'Validacion',
            text: 'Debes ingresar una contraseña valida'
            })
        return;
    }
    loginForm.submit();
});
