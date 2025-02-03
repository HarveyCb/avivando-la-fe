$(document).ready(function () {
  // Inicializa DataTables con Search Highlight
  var table = $("#table-usuarios").DataTable({
    searchHighlight: true,
  });
  $("#search").on("keyup", function () {
    table.search(this.value).draw();
  });
});


function validarfiados() {
  var inputs = [
    [
      document.getElementById("nombres").value,
      document.getElementById("apellidos").value,
    ],
    [document.getElementById("dpi").value],
    [document.getElementById("direccion").value],
    [
      document.getElementById("telefono").value,
      document.getElementById("telefono2").value,
    ],
  ];

  var soloLetras = /^[A-Za-z\s]+$/;

  
  // Validar el primer nombre
  if (soloLetras.test(inputs[0][0]) && inputs[0][0].length <= 50) {
    //console.log("Primer nombre válido:", inputs[0][0]);
  } else {
    Swal.fire({
      icon: "error",
      title: "Error de validación",
      text: "Por favor, ingresa un primer nombre no mayor a 20 caracteres.",
    });
    return;
  }

  // Validar el segundo nombre
  if (soloLetras.test(inputs[0][1]) && inputs[0][1].length <= 20) {
    //console.log("Segundo nombre válido:", inputs[0][1]);
  } else {
    Swal.fire({
      icon: "error",
      title: "Error de validación",
      text: "Por favor, ingresa un segundo nombre válido con letras y no mayor a 20 caracteres.",
    });
    return;
  }

  // Validar el DPI (solo números y exactamente 13 dígitos)
  var soloNumeros = /^[0-9]+$/;
  if (soloNumeros.test(inputs[1][0]) && inputs[1][0].length === 13) {
    //console.log("DPI válido:", inputs[1][0]);
  } else {
    Swal.fire({
      icon: "error",
      title: "Error de validación",
      text: "Por favor, ingresa un DPI válido con exactamente 13 (números).",
    });
    return;
  }

  // Validar la dirección (no más de 50 caracteres)
  if (inputs[2][0].length <= 50) {
    //console.log("Dirección válida:", inputs[2][0]);
  } else {
    Swal.fire({
      icon: "error",
      title: "Error de validación",
      text: "La dirección no puede tener más de 50 caracteres.",
    });
    return;
  }

  // Validar los teléfonos (no pueden ser iguales y deben tener exactamente 8 números)
  var telefono1 = inputs[3][0];
  var telefono2 = inputs[3][1];
  if (
    telefono1 !== telefono2 &&
    soloNumeros.test(telefono1) &&
    soloNumeros.test(telefono2) &&
    telefono1.length === 8 &&
    telefono2.length === 8
  ) {
    //console.log("Teléfonos válidos:", telefono1, telefono2);
  } else {
    Swal.fire({
      icon: "error",
      title: "Error de validación",
      text: "Por favor, ingresa teléfonos válidos (diferentes y con 8 números cada uno).",
    });
    return;
  }

// AJAX para enviar los datos al CRUD
$.ajax({
    url: "../../src/cruds/crud_clientefiado.php",
    method: "POST",
    data: {
        condi: "insert_cliente",
        nombres: inputs[0][0],
        apellidos: inputs[0][1],
        dpi: inputs[1][0],
        direccion: inputs[2][0],
        telefono1: telefono1,
        telefono2: telefono2,
    },
    success: function (data) {
        const responseData = JSON.parse(data);
        if (responseData.status === "success") {
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: responseData.message,
        }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
                location.reload();
            }
        });
     } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: responseData.message,
            });
        }
    },
    error: function (error) {
        Swal.fire({
            icon: "error",
            title: "Error de servidor",
            text: "Hubo un problema al procesar la solicitud. Por favor, inténtalo de nuevo.",
        });
    },
});


  return;
}

//FUNCIONES QUE SOLO MUESTRAN COLORES XD
function validateName(input) {
  // Validar letras
  if (/^[A-Za-z\s]+$/.test(input.value)) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
  }
}

function validateDPI(input) {
  // Validar que contenga exactamente 13 números
  if (/^\d{13}$/.test(input.value)) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
  }
}

function validatedireccion(input) {
  input.classList.remove("is-invalid", "is-valid");
  var direccionValue = input.value;
  if (direccionValue.trim() === "" || direccionValue.length > 50) {
    input.classList.add("is-invalid");
  } else {
    input.classList.add("is-valid");
  }
}
// Validar que contenga exactamente 10 números
function validatePhoneNumber(input) {
  if (/^\d{8}$/.test(input.value)) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
  }
}

function validateDate(input) {
  var currentDate = new Date().toISOString().split("T")[0];
  if (input.value >= currentDate) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    f;
  }
}

function validateForm() {
  validateName(document.getElementById("nombres"));
  validateName(document.getElementById("apellidos"));
  validateDPI(document.getElementById("dpi"));
  validatePhoneNumber(document.getElementById("telefono"));
  validateDate(document.getElementById("fechaCancelar"));
}
//ver datos en los inputs   

function ViewDato() {
  var selectCliente = document.getElementById("ControlForm");
  var selectedOption = selectCliente.options[selectCliente.selectedIndex];
  var datosCliente = selectedOption.value.split(',');

  document.getElementById("idCliente").value = datosCliente[0];
  document.getElementById("nombreCliente").value = datosCliente[1];
  document.getElementById("apellidoCliente").value = datosCliente[2];
  document.getElementById("dpiview").value = datosCliente[3];
  document.getElementById("telefonoview").value = datosCliente[4];

}



function obtenerDat() {
  var id = document.getElementById("idCliente").value;

  $.ajax({
    url: "../../src/cruds/crud_clientefiado.php",
    method: "POST",
    data: {
        condi: "fiadoE1",
        id:id 
    },
    success: function (data) {
        const responseData = JSON.parse(data);
        if (responseData.status === "success") {
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: responseData.message,
        }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
                location.reload();
            }
        });
     } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: responseData.message,
            });
        }
    },
    error: function (error) {
        Swal.fire({
            icon: "error",
            title: "Error de servidor",
            text: "Hubo un problema al procesar la solicitud. Por favor, inténtalo de nuevo.",
        });
    },
});
  console.log("Datos del cliente:", id);
}

function sendfiado(id_prod) {
  var cantidad = parseInt(document.getElementById('cantidad' + id_prod).value);
  console.log("Datos del cliente:", cantidad,id_prod);
 // return;
  $.ajax({
    url: "../../src/cruds/crud_clientefiado.php",
    method: "POST",
    data: {
        condi: "fiadoF2",
        id_prod:id_prod,
        cantidad:cantidad
    },
    success: function (data) {
        const responseData = JSON.parse(data);
        if (responseData.status === "success") {
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: responseData.message,
        }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
                location.reload();
            }
        });
     } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: responseData.message,
            });
        }
    },
    error: function (error) {
        Swal.fire({
            icon: "error",
            title: "Error de servidor",
            text: "Hubo un problema al procesar la solicitud. Por favor, inténtalo de nuevo.",
        });
    },
});

}
