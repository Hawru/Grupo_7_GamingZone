const { create } = require("../../src/database/models/gameListModel");

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const allowedExtensionsRegex = /(\.jpg|\.jpeg|\.png)$/i;
let createForm = document.getElementById('create-form');

createForm.addEventListener('submit', function(e){
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
  if(typeof title !== "string" || title.length > 120) 
  {
      Swal.fire({
          icon: 'error',
          title: 'Validacion',
          text: 'El titulo no debe pasar de los 120 caracteres'
        })
      return;
  }
  if(typeof description !== "string") 
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
  createForm.submit();
});
