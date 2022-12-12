const userRegex = /^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
const passwordRegex = /^[a-zA-Z0-9._-]{5,10}$/
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const allowedExtensionsRegex = /(\.jpg|\.jpeg|\.png)$/i;
document.getElementById("register-form").addEventListener('submit', validateRegisterUser);

function validateRegisterUser(e){
    e.preventDefault();
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let profile_image = document.getElementById("profile_image").value;
    let password = document.getElementById("password").value;
    if(typeof username !== "string" || !userRegex.test(username))
    {
        Swal.fire({
            icon: 'error',
            title: 'Validacion',
            text: 'Debes ingresar un usuario valido(No puede tener caracteres especiales ni tener menos de 4 a 20 letras)'
          })
        return;
    }
    if(typeof email !== "string" || !emailRegex.test(email))
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
    if(typeof password !== "string" || !password.test(password))
    {
        Swal.fire({
            icon: 'error',
            title: 'Validacion',
            text: 'La contraseña no debe contener caracteres especiales y debe tener mas de 5 caracteres y un maximo de 10'
          })
        return;
    }
    console.log(password)
    document.getElementById("register-form").submit();
  }